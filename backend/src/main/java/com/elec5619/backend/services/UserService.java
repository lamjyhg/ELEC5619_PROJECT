package com.elec5619.backend.services;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.dtos.DeleteUserRequest;

import com.elec5619.backend.dtos.UserResponse;
import com.elec5619.backend.entities.Role;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.repositories.RoleRepository;
import com.elec5619.backend.entities.Role;
import com.elec5619.backend.utils.EmailSendingHandler;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.repositories.UserRepository;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.Collectors;
import java.lang.Long;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final RegisterMapper registerMapper;
    private final RoleRepository roleRepository;
    private final LoginMapper loginMapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final HashUtil hashUtil;
    private final UserMapper userMapper;

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
        System.out.println("register");
        System.out.println(user);
        Optional<Role> checkUserRole = roleRepository.getRoleByName("Customer");
        Role userRole;
        if (!checkUserRole.isPresent()) {
            userRole = new Role("Customer");
            roleRepository.save(userRole);
        } else {
            userRole = checkUserRole.get();
        }
        user.addRole(userRole);
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
        userRepository.save(user);

        //

        return new ResponseEntity<>("Register Success!", HttpStatus.OK);
    }


    public ResponseEntity getUser(LoginRequest userRequest, HttpSession session) {
        User user = loginMapper.toEntity(userRequest);
        Optional<User> checkUser = userRepository.getUserByEmail(user.getEmail());
        System.out.println(checkUser);
        if (checkUser.isPresent()) {
            // email exist, check password

            boolean isMatch = hashUtil.matchPassword(user.getPassword(), checkUser.get().getPassword());

            if (isMatch) {
                String token = jwtTokenUtil.generateToken(userRequest);
                session.setAttribute("token", token);
                Map<String, Object> response = new HashMap<String, Object>();
                response.put("token", token);
                response.put("user", loginMapper.fromEntity(checkUser.get()));
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

        }
        return new ResponseEntity<>("Login failed!", HttpStatus.BAD_REQUEST);
    }

    public void getUserRole(HttpSession session) {


        if(session != null){
            System.out.println(jwtTokenUtil.getTokenEmail((String) session.getAttribute("token")));
        }

    }

    public List<UserResponse> getAllUsers(){
        List<User> userList = userRepository.findAll();
        System.out.println("==============> 1. Simple For loop Example.");

        return userList.stream().map(user -> userMapper.fromEntity(user)).collect(Collectors.toList());
    }
    @Transactional
    public ResponseEntity deleteUser(DeleteUserRequest request){
        User user = userMapper.toEntity(request);
        User u = userRepository.getUserInstanceByEmail(user.getEmail());
        //System.out.println(u.getUsername());
        //System.out.println(userRepository.count());
        userRepository.deleteByEmail(user.getEmail());
        //System.out.println(userRepository.count());
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
        System.out.println("String request is " + request);
        System.out.println("u.getUsername() result is: ");
        System.out.println(u.getUsername());
        return userMapper.fromEntity(u);
    }

    public ResponseEntity updateRole(String role, String email){
        System.out.println("--------------------------------");
        System.out.println(role);
        System.out.println(email);
        User u = userRepository.findByEmail(email);
        System.out.println("u.username: ");
        System.out.println(u.getUsername());
        System.out.println("u.role");
        Set<Role> roles = u.getRoles();
        Role[] roleArray = roles.toArray(new Role[roles.size()]);
        System.out.println(roles.size());
        System.out.println("--------------add new role------------------");
        Role userRole = new Role("Customer");
        u.addRole(userRole);
        roles = u.getRoles();
        System.out.println(roles.size());
        //userRepository.save(u);
        //u.role = role;
        return ResponseEntity.ok("user deleted");
    }
}
