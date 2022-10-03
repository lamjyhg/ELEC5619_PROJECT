package com.elec5619.backend.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
@Component
public class HashUtil {

    SecureRandom random;
    int factor;
    BCryptPasswordEncoder bCryptPasswordEncoder;


    public HashUtil(){
        factor = 20;
        random = new SecureRandom();
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }


    public String encrypy(String password) {

        System.out.println("****************************** Start");


        System.out.println("****************************** 1");
        String hashPassword = this.bCryptPasswordEncoder.encode(password);
        System.out.println("****************************** 2");

        return hashPassword;
    }


    public boolean matchPassword(String inputPassword, String password){
        boolean isMatch = this.bCryptPasswordEncoder.matches(inputPassword, password);
        return isMatch;
    }


}
