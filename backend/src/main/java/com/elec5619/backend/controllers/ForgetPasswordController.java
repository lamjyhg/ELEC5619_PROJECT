package com.elec5619.backend.controllers;


import com.elec5619.backend.dtos.*;
import com.elec5619.backend.services.ForgetPasswordService;
import com.elec5619.backend.utils.EmailHtmlHandlers;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping(path = "/")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class ForgetPasswordController {

    private final ForgetPasswordService forgetPasswordService;

    @PostMapping("/forget_password")
    public  void sendEmail(@RequestBody ForgetPasswordRequest request) throws IOException {
        forgetPasswordService.sendEmail(request.getEmail());
    }


    @PostMapping("/forget_password/check")
    public ResponseEntity checkHash(@RequestBody ForgetPasswordCheckRequest request) throws IOException {
        return forgetPasswordService.checkHash(request.getHash());
    }


    @PostMapping("/forget_password/reset")
    public ResponseEntity resetPassword(@RequestBody ForgetPasswordResetRequest request){
        return forgetPasswordService.resetPassword(request.getHash(), request.getPassword());
    }

}
