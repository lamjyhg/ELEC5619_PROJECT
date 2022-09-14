package com.elec5619.backend.services;

import com.elec5619.backend.dtos.UserRequest;
import com.elec5619.backend.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.repositories.UserRepository;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;


    public Map<Boolean, String> createUser(UserRequest userRequest) {


        User user = userMapper.toEntity(userRequest);
        Optional<User> repeatEmail = userRepository.getUserByEmail(user.getEmail());
        Optional<User> repeatUsername = userRepository.getUserByUsername(user.getUsername());

        Map<Boolean, String> retMap = new HashMap<>();

        if (repeatEmail.isPresent()) {
            // user exists
            retMap.put(false, "This email has been registered.");

            return retMap;
        }

        if(repeatUsername.isPresent()){
            retMap.put(false, "This username has been registered.");

            return retMap;
        }



        userRepository.save(user);
        retMap.put(true, "Register Success!");

        return retMap;
    }



    public boolean getUser(UserRequest userRequest){
        User user = userMapper.toEntity(userRequest);
        Optional<User> checkUser = userRepository.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        if(checkUser.isPresent()){
            // login success
            return true;
        }

        return false;
    }



}
