package com.elec5619.backend.services;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.repositories.UserRepository;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final RegisterMapper registerMapper;
    private final LoginMapper loginMapper;


    public ResponseEntity createUser(RegisterRequest userRequest) {


        User user = registerMapper.toEntity(userRequest);
        Optional<User> repeatEmail = userRepository.getUserByEmail(user.getEmail());
        Optional<User> repeatUsername = userRepository.getUserByUsername(user.getUsername());


        if (repeatEmail.isPresent()) {
            // user exists
            return new ResponseEntity<>("This email has been registered.", HttpStatus.BAD_REQUEST);
        }

        if(repeatUsername.isPresent()){

            return new ResponseEntity<>("This username has been registered.", HttpStatus.BAD_REQUEST);
        }



        userRepository.save(user);

        return new ResponseEntity<>("Register Success!", HttpStatus.OK);
    }



    public ResponseEntity getUser(LoginRequest userRequest){
        User user = loginMapper.toEntity(userRequest);
        Optional<User> checkUser = userRepository.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        if(checkUser.isPresent()){
            // login success
            return new ResponseEntity<>("Login Success!", HttpStatus.OK);
        }

        return new ResponseEntity<>("Login failed!", HttpStatus.BAD_REQUEST);
    }



}
