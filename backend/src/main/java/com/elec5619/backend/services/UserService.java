package com.elec5619.backend.services;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.dtos.UserResponse;
import com.elec5619.backend.entities.Role;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import com.elec5619.backend.repositories.RoleRepository;
import com.elec5619.backend.utils.HashUtil;
import com.elec5619.backend.utils.JwtTokenUtil;
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

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final RegisterMapper registerMapper;
    private final RoleRepository roleRepository;
    private final LoginMapper loginMapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final HashUtil hashUtil;


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

        if (session != null) {
            jwtTokenUtil.getTokenEmail((String) session.getAttribute("token"));
        }

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

}
