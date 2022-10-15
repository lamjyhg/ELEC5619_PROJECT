package com.elec5619.backend;


import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.RegisterRequest;
import com.elec5619.backend.entities.AccountVerificationEntity;
import com.elec5619.backend.entities.Role;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.mappers.LoginMapper;
import com.elec5619.backend.mappers.RegisterMapper;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.repositories.AccountVerificationEntityRepository;
import com.elec5619.backend.repositories.RoleRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.services.UserService;
import com.elec5619.backend.utils.EmailHtmlHandlers;
import com.elec5619.backend.utils.EmailSendingHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TestUserService {


    private static final Logger LOGGER = LoggerFactory.getLogger(TestUserService.class);

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;
    @MockBean
    private RoleRepository roleRepository;
    @MockBean
    private LoginMapper loginMapper;
    @MockBean
    private RegisterMapper registerMapper;




    @Mock
    HttpSession session;
    @Mock
    LoginRequest loginRequest;
    @Mock
    RegisterRequest registerRequest;


    @Autowired
    private UserMapper userMapper;


    @MockBean
    HashUtil hashUtil;
    @MockBean
    JwtTokenUtil jtwUtil;


    @Mock
    AccountVerificationEntity accountVerificationEntity;


    private static String TEST_PASSWORD = "$2a$10$ZwDl18HE1I7uAlZ9jN80leTNFt8Qh5JR27.jEfQ68KAM3O0epzNqC";

    @Mock
    User user1;
    @Mock
    User user2;
    @Mock
    User user3;
    @Mock
    User user4;
    @Mock
    User user5;
    List<User> users;
    String password;


    @Mock
    Role customerRole;
    @Mock
    Role adminRole;
    @Mock
    AccountVerificationEntityRepository accountVerificationEntityRepository;


    @MockBean
    EmailSendingHandler emailSendingHanlder;
    @MockBean
    EmailHtmlHandlers emailHtmlHandlers;


    public TestUserService() throws NoSuchFieldException {
    }

    @BeforeEach
    void setUp(){


        password = "$2a$10$ZwDl18HE1I7uAlZ9jN80leTNFt8Qh5JR27.jEfQ68KAM3O0epzNqC";

        users = new ArrayList<>();


        // user1 setup
        when(user1.getEmail()).thenReturn("user1@a.com");
        when(user1.getActive()).thenReturn(true);
        when(user1.getUsername()).thenReturn("user1_uname");
        when(user1.getName()).thenReturn("user1_name");
        when(user1.getPassword()).thenReturn(password);

        // user2 setup
        when(user2.getEmail()).thenReturn("user2@a.com");
        when(user2.getActive()).thenReturn(true);
        when(user2.getUsername()).thenReturn("user2_uname");
        when(user2.getName()).thenReturn("user2_name");
        when(user2.getPassword()).thenReturn(password);

        // user3 setup
        when(user3.getEmail()).thenReturn("user3@a.com");
        when(user3.getActive()).thenReturn(true);
        when(user3.getUsername()).thenReturn("user3_uname");
        when(user3.getName()).thenReturn("user3_name");
        when(user3.getPassword()).thenReturn(password);

        // user4 setup
        when(user4.getEmail()).thenReturn("user4@a.com");
        when(user4.getActive()).thenReturn(true);
        when(user4.getUsername()).thenReturn("user4_uname");
        when(user4.getName()).thenReturn("user4_name");
        when(user4.getPassword()).thenReturn(password);


        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);

        when(userRepository.findAll()).thenReturn(users);
        when(userRepository.getUserByEmail(user1.getEmail())).thenReturn(Optional.ofNullable(user1));
        when(userRepository.getUserByEmail(user2.getEmail())).thenReturn(Optional.ofNullable(user2));
        when(userRepository.getUserByEmail(user3.getEmail())).thenReturn(Optional.ofNullable(user3));
        when(userRepository.getUserByEmail(user4.getEmail())).thenReturn(Optional.ofNullable(user4));









    }

    @Test
    public void testGetAllUsers(){
        assertEquals(4, userService.getAllUsers().size());
    }

    @Test
    public void testLoginSuccess(){


        when(loginRequest.getEmail()).thenReturn("user1@a.com");
        when(loginRequest.getPassword()).thenReturn(password);

        String token = jtwUtil.generateToken(loginRequest);

        when(loginMapper.toEntity(loginRequest)).thenReturn(user1);
        when(userRepository.getUserByEmailAndPassword(user1.getEmail(), user1.getPassword())).thenReturn(Optional.ofNullable(user1));
        when(session.getAttribute("token")).thenReturn(token);

        when(hashUtil.matchPassword(TEST_PASSWORD, TEST_PASSWORD)).thenReturn(true);

        ResponseEntity entity = userService.getUser(loginRequest, session);

        HttpStatus code = entity.getStatusCode();

        assertNotNull(entity);
        assertEquals(code.getReasonPhrase(), "OK");
    }


    @Test
    public void testLoginEmailNotExists(){


        when(loginRequest.getEmail()).thenReturn("user5@a.com");
        when(loginRequest.getPassword()).thenReturn(password);

        String token = jtwUtil.generateToken(loginRequest);

        when(loginMapper.toEntity(loginRequest)).thenReturn(user5);
        when(userRepository.getUserByEmailAndPassword(user5.getEmail(), user5.getPassword())).thenReturn(Optional.empty());
        when(session.getAttribute("token")).thenReturn(token);

        when(hashUtil.matchPassword(TEST_PASSWORD, TEST_PASSWORD)).thenReturn(true);

        ResponseEntity entity = userService.getUser(loginRequest, session);

        HttpStatus code = entity.getStatusCode();

        assertNotNull(entity);
        assertEquals(code.getReasonPhrase(), "Bad Request");
    }


    @Test
    public void testLoginEmailWrongPassword(){


        when(loginRequest.getEmail()).thenReturn("user5@a.com");
        when(loginRequest.getPassword()).thenReturn(password);

        String token = jtwUtil.generateToken(loginRequest);

        when(loginMapper.toEntity(loginRequest)).thenReturn(user5);
        when(userRepository.getUserByEmailAndPassword(user5.getEmail(), user5.getPassword())).thenReturn(Optional.ofNullable(user5));
        when(session.getAttribute("token")).thenReturn(token);

        when(hashUtil.matchPassword(any(), any())).thenReturn(false);

        ResponseEntity entity = userService.getUser(loginRequest, session);

        HttpStatus code = entity.getStatusCode();

        assertNotNull(entity);
        assertEquals(code.getReasonPhrase(), "Bad Request");
    }




//    @Test
//    public void testRegisterSuccess() throws IOException {
//
//
//        doNothing().when(emailSendingHanlder).send(any(),any(),any());
//        doReturn(null).when(accountVerificationEntityRepository).save(any());
//
//
//        when(emailHtmlHandlers.getActivateAccountEmailHtml(any())).thenReturn("");
//        when(roleRepository.save(any())).thenReturn(null);
//        when(userRepository.save(any())).thenReturn(null);
//
//        when(roleRepository.getRoleByName("user5")).thenReturn(Optional.ofNullable(customerRole));
//        when(userRepository.getUserByEmail("user5@a.com")).thenReturn(Optional.empty());
//        when(userRepository.getUserByUsername("user5_uname")).thenReturn(Optional.empty());
//        when(session.getAttribute("token")).thenReturn("null");
//        when(jtwUtil.getTokenEmail(any())).thenReturn(null);
//        when(registerMapper.toEntity(any())).thenReturn(user5);
//
//        ResponseEntity entity = userService.createUser(registerRequest, null);
//
//        assertNotNull(entity);
//
//
//    }


}
