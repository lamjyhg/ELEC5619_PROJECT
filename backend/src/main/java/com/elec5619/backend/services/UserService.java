package com.elec5619.backend.services;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.dtos.DeleteUserRequest;

import com.elec5619.backend.dtos.UserResponse;
import com.elec5619.backend.entities.AccountVerificationEntity;
import com.elec5619.backend.entities.Role;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.repositories.AccountVerificationEntityRepository;
import com.elec5619.backend.repositories.RoleRepository;
import com.elec5619.backend.utils.EmailHtmlHandlers;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.UserNew;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.repositories.UserNewRepository;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserNewRepository userNewRepository;

    private final RegisterMapper registerMapper;
    private final RoleRepository roleRepository;
    private final LoginMapper loginMapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final HashUtil hashUtil;
    private final UserMapper userMapper;

    private final AccountVerificationEntityRepository accountVerificationEntityRepository;

    private final EmailService emailService;

    public User getUserByToken(HttpSession session) throws AuthenticationError {
        try {
            String email = jwtTokenUtil.getTokenEmail((String) session.getAttribute("token"));
            Optional<User> user  = userRepository.getUserByEmail(email);
            if(! user.isPresent()){
                throw new AuthenticationError("not authorized");
            }
            return user.get();
        }
        catch (Exception exc) {
            throw new AuthenticationError("not authorized");
        }
    }

    public UserResponse getUserResponseByToken(HttpSession session) throws AuthenticationError {

        System.out.println("in token !!!");
        try {
            String email = jwtTokenUtil.getTokenEmail((String) session.getAttribute("token"));
            Optional<User> user  = userRepository.getUserByEmail(email);
            if(! user.isPresent()){
                throw new AuthenticationError("not authorized");
            }

            return userMapper.fromEntity(user.get());
        }
        catch (Exception exc) {
            throw new AuthenticationError("not authorized");
        }
    }


    public ResponseEntity createUser(RegisterRequest userRequest, HttpSession session) {


        User user = registerMapper.toEntity(userRequest);
        Optional<Role> checkUserRole = roleRepository.getRoleByName("Customer");
        Role userRole;
        if (!checkUserRole.isPresent()) {
            userRole = new Role("Customer");
            roleRepository.save(userRole);
        } else {
            userRole = checkUserRole.get();
        }
        Optional<User> repeatEmail = userRepository.getUserByEmail(user.getEmail());
        Optional<User> repeatUsername = userRepository.getUserByUsername(user.getUsername());

        if (session != null && jwtTokenUtil.getTokenEmail((String) session.getAttribute("token")) != null) {
            return new ResponseEntity<>("PLEASE LOGIN", HttpStatus.BAD_REQUEST);
        }

        if (repeatEmail.isPresent()) {
            // user exists
            return new ResponseEntity<>("This email has been registered.", HttpStatus.BAD_REQUEST);
        }

        if (repeatUsername.isPresent()) {
            return new ResponseEntity<>("This username has been registered.", HttpStatus.BAD_REQUEST);
        }
//        user.setName(user.getUsername());

        String hashedPassword = hashUtil.encrypy(user.getPassword());
        user.setPassword(hashedPassword);
        user.setType("USER");
        if(userRequest.getEmail().equals("gymmy@admin.com")){
            user.setType("ADMIN");
            user.setActive(true);
        }
        userRepository.save(user);

        AccountVerificationEntity accountVerificationEntity = new AccountVerificationEntity();
        System.out.println(accountVerificationEntity);
        accountVerificationEntity.setUser(user);
        accountVerificationEntityRepository.save(accountVerificationEntity);



        //sendEmail
        if(!userRequest.getEmail().equals("gymmy@admin.com")){
            try{
                EmailHtmlHandlers emailHtmlHandlers = new EmailHtmlHandlers();
                System.out.println(accountVerificationEntity.getId() == null);
                String content = emailHtmlHandlers.getActivateAccountEmailHtml(accountVerificationEntity.getId()!=null?accountVerificationEntity.getId().toString():"-");
                emailService.send(user.getEmail(), "Gymmy account activation", content);

            }catch(Exception e){
                System.out.println(e);
                accountVerificationEntityRepository.delete(accountVerificationEntity);
                userRepository.delete(user);

                throw new BadRequestException("email send failed, this could be an API issue.");
            }
        }



        return new ResponseEntity<>("Register Success!", HttpStatus.OK);
    }


    public ResponseEntity getUser(LoginRequest userRequest, HttpSession session) {
        User user = loginMapper.toEntity(userRequest);
        Optional<User> checkUser = userRepository.getUserByEmail(user.getEmail());


//        System.out.println(checkUser.get().getActive());



        if (checkUser.isPresent()) {
            // email exist, check password

            boolean isMatch = hashUtil.matchPassword(user.getPassword(), checkUser.get().getPassword());

            System.out.println(user.getPassword());
            System.out.println(checkUser.get().getPassword());
            System.out.println(isMatch);

            if (isMatch) {
                System.out.println(checkUser.get().getActive());
                if(!checkUser.get().getActive()){

                    throw new BadRequestException("account is not activated");
                }

                String token = jwtTokenUtil.generateToken(userRequest);
                session.setAttribute("token", token);
                Map<String, Object> response = new HashMap<String, Object>();
                response.put("token", token);
                response.put("user", loginMapper.fromEntity(checkUser.get()));
                if(checkUser.get().getType().equals("ADMIN")){
                    response.put("adminAuthorityToken", token);
                }
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

        }
        return new ResponseEntity<>("Login failed! Please check your password and email", HttpStatus.BAD_REQUEST);
    }

    public void getUserRole(HttpSession session) {


        if(session != null){
            System.out.println(jwtTokenUtil.getTokenEmail((String) session.getAttribute("token")));
        }

    }

    public List<UserResponse> getAllUsers(){
        List<User> userList = userRepository.findAll();
        userList = userList.stream().filter(user -> !user.getEmail().equals("gymmy@admin.com")).collect(Collectors.toList());

        return userList.stream().map(user -> userMapper.fromEntity(user)).collect(Collectors.toList());
    }
    @Transactional
    public ResponseEntity deleteUser(DeleteUserRequest request){
        User user = userMapper.toEntity(request);
        User u = userRepository.getUserInstanceByEmail(user.getEmail());
        //System.out.println(u.getUsername());
        System.out.println(userRepository.count());
        userRepository.deleteByEmail(user.getEmail());
        System.out.println(userRepository.count());
        // repeatEmail = userRepository.getUserByEmail(user.getEmail());
        // System.out.println(repeatEmail.isPresent());
        return ResponseEntity.ok("user deleted");
    }
    public UUID getUserId(HttpSession session){
        if (session != null) {
            String userEmail = jwtTokenUtil.getTokenEmail((String) session.getAttribute("token"));
            Optional<User> checkUser = userRepository.getUserByEmail(userEmail);
            return checkUser.get().getId();
        }
        return null;
    }

    public UserResponse getUserInfo(UUID userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", userId)));
        return loginMapper.fromEntity(user);
    }

    public UserResponse getUserInstance(String request){
        //User user = userMapper.toEntity(request);
        User u = userRepository.findByEmail(request);
        return userMapper.fromEntity(u);
    }

    public ResponseEntity updateRole(String role, String email){
        UserNew u = userNewRepository.findByEmail(email);
        u.updateRole(role);
        userNewRepository.save(u);
        return ResponseEntity.ok("user updated");
    }

    public ResponseEntity activateAccount(UUID token){
        AccountVerificationEntity accountVerificationEntity = accountVerificationEntityRepository.findById(token).orElseThrow(() -> new IllegalArgumentException("Unknown id"));
        User user = accountVerificationEntity.getUser();
        user.setActive(true);

        userRepository.save(user);
        try{
            accountVerificationEntityRepository.deleteById(token);
        }catch (Exception e){
            throw new BadRequestException("activate failed");
        }
        return ResponseEntity.ok("activate successfully");
    }


    public ResponseEntity resetPassword(UUID id, String password, String oldPassword){

        Optional<User> userOptional = userRepository.findById(id);


        if(userOptional.isPresent() == false){
            return new ResponseEntity("Invalid user id, please try login again", HttpStatus.BAD_REQUEST);
        }
        User user = userOptional.get();


        boolean isMatch = hashUtil.matchPassword(oldPassword,user.getPassword());

        if(isMatch){
            String hashedPassword = hashUtil.encrypy(password);
            user.setPassword(hashedPassword);
            userRepository.save(user);
            return new ResponseEntity<>("change password success", HttpStatus.OK);
        }

        return new ResponseEntity<>("Incorrect old password", HttpStatus.BAD_REQUEST);


    }
    public ResponseEntity checkAdminAuthority(HttpSession session) throws AuthenticationError {
        User user = getUserByToken(session);
        //JsonObject object
        if(!user.getType().equals("ADMIN")){
            throw new AuthenticationError("Unauthorized to be admin");
        }
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("adminAuthorityToken", session.getAttribute("token"));
        return ResponseEntity.ok(response);
    }
}
