package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.*;
import com.elec5619.backend.exceptions.AuthenticationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.services.UserService;
import com.elec5619.backend.dtos.UserResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.io.IOException;
import java.util.UUID;

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

        userService.getUserRole(response);

        return res;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserResponse>> getAll() throws IOException {
        // return ResponseEntity.ok("yes");

        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/deleteUser")
    public ResponseEntity deleteUser(@Valid @RequestBody DeleteUserRequest user) {
        ResponseEntity response = userService.deleteUser(user);
        return response;
    }

    @RequestMapping("/getOne/{user}")
    public ResponseEntity getUserByEmail(@PathVariable String user) {
        return ResponseEntity.ok(userService.getUserInstance(user));
    }

    @RequestMapping("/updateRole/{role}/{email}")
    public ResponseEntity updateRole(@PathVariable String role, @PathVariable String email) {
        ResponseEntity response = userService.updateRole(role, email);
        return response;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable  UUID userId){
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }


    @GetMapping("/current_user")
    public ResponseEntity<UserResponse> getCurrentUser(HttpSession session) throws AuthenticationError {
        return ResponseEntity.ok(userService.getUserResponseByToken(session));
    }

    @PutMapping("/activate/{token}")
    public ResponseEntity activateUser(@PathVariable  UUID token) {
        return ResponseEntity.ok(userService.activateAccount(token));
    }


    @PostMapping("/reset")
    public ResponseEntity resetPassword(@RequestBody ResetPasswordRequest request, HttpSession session)  {

        try{
            User user = userService.getUserByToken(session);
            return userService.resetPassword(user.getId(), request.getPassword(), request.getOldPassword());
        }catch (AuthenticationError e){
            return new ResponseEntity<>("Invalid session or expired session, please try login again", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/checkAdminAuthority")
    public  ResponseEntity checkAdminAuthority(HttpServletRequest request) throws AuthenticationError {
        HttpSession session = request.getSession();
        return userService.checkAdminAuthority(session);
    }
}
