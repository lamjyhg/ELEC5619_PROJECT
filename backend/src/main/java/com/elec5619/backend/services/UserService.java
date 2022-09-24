package com.elec5619.backend.services;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import com.elec5619.backend.utils.HashUtil;
import com.elec5619.backend.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.repositories.UserRepository;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final RegisterMapper registerMapper;
    private final LoginMapper loginMapper;
    private final JwtTokenUtil jwtTokenUtil;
    private final HashUtil hashUtil;


    public ResponseEntity createUser(RegisterRequest userRequest, HttpSession session) {



        User user = registerMapper.toEntity(userRequest);
        Optional<User> repeatEmail = userRepository.getUserByEmail(user.getEmail());
        Optional<User> repeatUsername = userRepository.getUserByUsername(user.getUsername());



        if(jwtTokenUtil.getTokenEmail((String)session.getAttribute("token")) != null){
            return new ResponseEntity<>("PLEASE LOGIN", HttpStatus.BAD_REQUEST);
        }


        if (repeatEmail.isPresent()) {
            // user exists
            return new ResponseEntity<>("This email has been registered.", HttpStatus.BAD_REQUEST);
        }

        if(repeatUsername.isPresent()){

            return new ResponseEntity<>("This username has been registered.", HttpStatus.BAD_REQUEST);
        }


        String hashedPassword = hashUtil.encrypy(user.getPassword());
        user.setPassword(hashedPassword);


        userRepository.save(user);

        return new ResponseEntity<>("Register Success!", HttpStatus.OK);
    }



    public ResponseEntity getUser(LoginRequest userRequest, HttpSession session){
        User user = loginMapper.toEntity(userRequest);
        Optional<User> checkUser = userRepository.getUserByEmail(user.getEmail());
        if(checkUser.isPresent()){
            // email exist, check password

            boolean isMatch = hashUtil.matchPassword(user.getPassword(), checkUser.get().getPassword());

            if(isMatch){
                String token = jwtTokenUtil.generateToken(userRequest);
//                Cookie cookie = new Cookie("token", token);

                session.setAttribute("token", token);
                return new ResponseEntity<>("Login success!", HttpStatus.OK);
            }

        }



        return new ResponseEntity<>("Login failed!", HttpStatus.BAD_REQUEST);
    }



}
