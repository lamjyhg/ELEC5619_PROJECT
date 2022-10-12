package com.elec5619.backend.services;


import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.UserForgetPassword;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.repositories.UserForgetPasswordRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.utils.EmailHtmlHandlers;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import com.elec5619.backend.utils.HashGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.*;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ForgetPasswordService {

    private final UserRepository userRepository;
    private final UserForgetPasswordRepository userForgetPasswordRepository;
    private final EmailHtmlHandlers emailHtmlHandlers = new EmailHtmlHandlers();
    private final HashGenerator hashGenerator = new HashGenerator();
    private final EmailSendingHanlderImple emailSendingHanlderImple = new EmailSendingHanlderImple("lamjh1999@gmail.com");
    private final HashUtil hashUtil;


    public ResponseEntity checkHash(String hash){

        Optional<UserForgetPassword> userForgetPassword = userForgetPasswordRepository.getUserForgetPasswordByHash(hash);

        if(userForgetPassword.isPresent() == false){
            return new ResponseEntity<>("Invalid link !", HttpStatus.BAD_REQUEST);
        }




        return new ResponseEntity<>("Correct link to reset password", HttpStatus.OK);
    }


    public ResponseEntity resetPassword(String hash, String password){

        Optional<UserForgetPassword> userForgetPassword = userForgetPasswordRepository.getUserForgetPasswordByHash(hash);
        System.out.println(userForgetPassword.isPresent());
        if(userForgetPassword.isPresent()){
            UserForgetPassword userForgetPassword1 = userForgetPassword.get();
            UUID uid = userForgetPassword1.getUid();
            Optional<User> userOptional = userRepository.findById(uid);
            User user = userOptional.get();

            String hashedPassword = hashUtil.encrypy(password);

            user.setPassword(hashedPassword);

            userForgetPassword1.setHash("");
            userForgetPasswordRepository.save(userForgetPassword.get());


            userRepository.save(user);
            return new ResponseEntity<>("reset success", HttpStatus.OK);
        }

        return new ResponseEntity<>("reset failed", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity sendEmail(String email) throws IOException {
        Optional<User> userOptional = userRepository.getUserByEmail(email);

        if(userOptional.isPresent()){
            User user = userOptional.get();
            String hash = hashGenerator.generateHash();
            String html = emailHtmlHandlers.getForgetPasswordEmailHtml(hash);

            try{
                emailSendingHanlderImple.send(email, "Gymmy: Reset password", html);
            }catch (Exception e){
                System.out.println(e);
                return new ResponseEntity<>("Send email failed, internal server error", HttpStatus.BAD_REQUEST);
            }



            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime localDateTime = LocalDateTime.now();
            String time = dateTimeFormatter.format(localDateTime);


            Optional<UserForgetPassword> check = userForgetPasswordRepository.getUserForgetPasswordByUid(user.getId());


            if(check.isPresent()){
                UserForgetPassword userForgetPassword = check.get();
                userForgetPassword.setHash(hash);
                userForgetPasswordRepository.save(userForgetPassword);
            }else{
                UserForgetPassword newObj = new UserForgetPassword();

                newObj.setUid(user.getId());
                newObj.setHash(hash);
                newObj.setDate(time);
                userForgetPasswordRepository.save(newObj);
            }

            return new ResponseEntity<>("Send email success", HttpStatus.OK);

        }

//        return new ResponseEntity<>("Invalid user email, login status error", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>("Send email success", HttpStatus.OK);
    }


}
