package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/Register")
    public ResponseEntity createUser(@Valid @RequestBody RegisterRequest user, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        ResponseEntity response = userService.createUser(user, session);

        return response;
    }

    @PostMapping("/Login")
    public ResponseEntity getUser(@Valid @RequestBody LoginRequest user, HttpSession response) {

        ResponseEntity res = userService.getUser(user, response);

        return res;
    }

}
