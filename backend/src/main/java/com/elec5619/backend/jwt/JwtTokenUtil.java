package com.elec5619.backend.jwt;

import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.mappers.RegisterMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Null;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Component
public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = -8214071982140719L;
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    @Value("${jwt.secret}")
    private String secret;


    public String generateToken(LoginRequest request) {

        String token = setTokenAttributes(request);
        System.out.println(token);
        return token;
    }

    private String setTokenAttributes(LoginRequest subject) {


        return Jwts.builder()
                .claim("email", subject.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }


    public String getTokenEmail(String token){

        try{
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            String tokenEmail= (String)body.get("email");
            System.out.println(tokenEmail);
            return tokenEmail;
        }catch (Exception e){
            return null;
        }
    }


}
