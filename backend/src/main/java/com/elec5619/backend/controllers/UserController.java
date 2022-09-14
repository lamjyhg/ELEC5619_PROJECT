package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.services.UserService;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/Register")
    public Map<Boolean, String> createUser( @RequestBody UserRequest user) {

        System.out.println(user);

        Map<Boolean, String> registerMap = userService.createUser(user);

        return registerMap;
    }


    @GetMapping("/Login")
    public boolean getUser(@Valid @RequestBody UserRequest user) {


        boolean registerRes = userService.getUser(user);

        return registerRes;
    }


}
