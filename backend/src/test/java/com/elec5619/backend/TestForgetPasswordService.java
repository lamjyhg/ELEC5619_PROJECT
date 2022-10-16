package com.elec5619.backend;

import com.elec5619.backend.entities.AccountVerificationEntity;
import com.elec5619.backend.dtos.ForgetPasswordRequest;
import com.elec5619.backend.dtos.ForgetPasswordCheckRequest;
import com.elec5619.backend.dtos.ForgetPasswordResetRequest;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.UserForgetPassword;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.repositories.UserForgetPasswordRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.services.EmailService;
import com.elec5619.backend.services.ForgetPasswordService;
import com.elec5619.backend.utils.EmailHtmlHandlers;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import com.elec5619.backend.utils.HashGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpSession;
import java.io.IOException;

import java.util.Optional;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TestForgetPasswordService {

    @Autowired
    private ForgetPasswordService forgetPasswordService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    UserForgetPasswordRepository userForgetPasswordRepository;
    @MockBean
    private EmailService emailService;
    @Mock
    User user1;



    @Mock
    HttpSession session;

    @Autowired
    private UserMapper userMapper;

    @MockBean
    HashUtil hashUtil;
    @MockBean
    JwtTokenUtil jtwUtil;

    @MockBean
    HashGenerator hashGenerator;

    @Mock
    ForgetPasswordResetRequest forgetPasswordResetRequest;

    @Mock
    ForgetPasswordCheckRequest forgetPasswordCheckRequest;

    @Mock
    ForgetPasswordRequest forgetPasswordRequest;

    @Mock
    AccountVerificationEntity accountVerificationEntity;


    @MockBean
    EmailSendingHandler emailSendingHanlder;
    @Mock
    EmailSendingHanlderImple emailSendingHanlderImple  = spy(new EmailSendingHanlderImple("mockMail@gmail.com"));
    @MockBean
    UserForgetPassword userForgetPassword;
    @Mock
    EmailHtmlHandlers emailHtmlHandlers;
    EmailHtmlHandlers emailHtmlHandlersSpy;

    String password;
@BeforeEach
 void setUp() {
     emailHtmlHandlers = spy(new EmailHtmlHandlers());
     password = hashUtil.encrypy("password");

     // user1 setup
     when(user1.getEmail()).thenReturn("user1@a.com");
     when(user1.getActive()).thenReturn(true);
     when(user1.getUsername()).thenReturn("user1_uname");
     when(user1.getName()).thenReturn("user1_name");
     when(user1.getPassword()).thenReturn(password);

     when(userRepository.getUserByEmail(user1.getEmail())).thenReturn(Optional.ofNullable(user1));
     when(userForgetPassword.getUid()).thenReturn(UUID.randomUUID());

 }

    @Test
    public void testResetPasswordSuccess() throws IOException {
        when(userForgetPasswordRepository.getUserForgetPasswordByHash("mockhash")).thenReturn(Optional.ofNullable(userForgetPassword));
        when(userRepository.findById(any())).thenReturn(Optional.ofNullable(user1));
        when(hashUtil.encrypy("1234")).thenReturn("success");
        doNothing().when(user1).setPassword(any());
        doNothing().when(userForgetPassword).setHash(any());
        doReturn(null).when(userForgetPasswordRepository).save(any());
        doReturn(null).when(userRepository).save(any());
        ResponseEntity entity = forgetPasswordService.resetPassword("mockhash", "1234");
        assertNotNull(entity);
        assertTrue(entity.getStatusCode().is2xxSuccessful());
    }


     @Test
     public void testForgetPasswordInvalidLink() throws IOException {
         ResponseEntity entity = forgetPasswordService.resetPassword("mockInvalidHash", "1234");
         assertNotNull(entity);
         assertTrue(entity.getStatusCode().is4xxClientError());
     }


//    @Test
//    public void testForgetPasswordValidEmail() throws IOException {
//        when(userForgetPasswordRepository.getUserForgetPasswordByHash("mockhash")).thenReturn(Optional.ofNullable(userForgetPassword));
//        doNothing().when(emailService).send(any(),any(),any());
//        doNothing().when(emailSendingHanlder).send(any(),any(),any());
//        when(userRepository.getUserByEmail(any())).thenReturn(Optional.ofNullable(user1));
//        when(hashGenerator.generateHash()).thenReturn("");
//        when(emailHtmlHandlers.getForgetPasswordEmailHtml(any())).thenReturn("");
//        doNothing().when(emailSendingHanlderImple).send(any(),any(),any());
//        when(userForgetPasswordRepository.getUserForgetPasswordByUid(UUID.randomUUID())).thenReturn(Optional.ofNullable(userForgetPassword));
//        when(userForgetPasswordRepository.save(any())).thenReturn("");
//        ResponseEntity entity = forgetPasswordService.sendEmail("ValidEmail");
//        assertNotNull(entity);
//        assertTrue(entity.getStatusCode().is2xxSuccessful());
//    }
//
//    @Test
//    public void testForgetPasswordInvalidEmail() throws IOException {
//        doNothing().when(emailService).send(any(),any(),any());
//        doNothing().when(emailSendingHanlder).send(any(),any(),any());
//        ResponseEntity entity = forgetPasswordService.sendEmail("InvalidEmail");
//        when(hashGenerator.generateHash()).thenReturn("");
//        when(emailHtmlHandlers.getForgetPasswordEmailHtml(any())).thenReturn("");
//        assertNotNull(entity);
//        assertTrue(entity.getStatusCode().is4xxClientError());
//    }

}
