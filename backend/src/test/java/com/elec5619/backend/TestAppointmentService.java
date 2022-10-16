package com.elec5619.backend;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.dtos.AppointmentUpdateTimeRequestDto;
import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.jwt.JwtTokenUtil;
//import com.elec5619.backend.repositories.RoleRepository;
import com.elec5619.backend.services.AppointmentService;
import com.elec5619.backend.services.UserService;
//import jdk.nashorn.internal.runtime.options.Option;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.elec5619.backend.repositories.AppointmentRepository;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;

import com.elec5619.backend.mappers.AppointmentMapper;

import org.springframework.boot.test.mock.mockito.MockBean;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Time;
import java.time.DayOfWeek;
import java.util.*;
import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TestAppointmentService {

    @Autowired
    private AppointmentService appointmentService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private GymRepository gymRepository;
    @MockBean
    private AppointmentRepository appointmentRepository;
    @MockBean
    private AppointmentUpdateTimeRequestDto appointmentUpdateTimeRequest;

    @Mock
    private UserService userService;
    @Mock
    HttpSession session;
    @Mock
    AppointmentRequestDto appointmentRequestDto;
    @Mock
    Appointment appointment1;
    @Mock
    Appointment appointment2;
    @Mock
    Appointment appointment3;
    @Mock
    Appointment appointment4;
    @Mock
    Appointment appointment5;

    @Mock
    User user1;
    @Mock
    User user2;
    @Mock
    User user3;
    @Mock
    Gym gym1;
    @Mock
    LoginRequest loginRequest;
    @Mock
    AppointmentResponseDto appointmentResponseDto;

    String password;
    UUID gymID1 = UUID.randomUUID();
    UUID userID1 = UUID.randomUUID();
    UUID userID2 = UUID.randomUUID();

    UUID appointmentID1 = UUID.randomUUID();
    UUID appointmentID2 = UUID.randomUUID();
    UUID newAppointmentID = UUID.randomUUID();
    LocalDateTime startTime;
    LocalDateTime endTime;
    List<Appointment> appointmentList;
    List<Appointment> appointments1;
    List<Appointment> appointments2;

    @MockBean
    JwtTokenUtil jtwUtil;

    @BeforeEach
    void setUp(){
        password = "$2a$10$ZwDl18HE1I7uAlZ9jN80leTNFt8Qh5JR27.jEfQ68KAM3O0epzNqC";
        startTime =  LocalDateTime.now();
        endTime =  LocalDateTime.now();
        when(user1.getId()).thenReturn(userID1);
        when(user1.getEmail()).thenReturn("user1@a.com");
        when(user1.getActive()).thenReturn(true);
        when(user1.getUsername()).thenReturn("user1_uname");
        when(user1.getName()).thenReturn("user1_name");
        when(user1.getPassword()).thenReturn(password);

        when(user2.getId()).thenReturn(userID2);
        when(user2.getEmail()).thenReturn("user2@a.com");
        when(user2.getActive()).thenReturn(true);
        when(user2.getUsername()).thenReturn("user2_uname");
        when(user2.getName()).thenReturn("user2_name");
        when(user2.getPassword()).thenReturn(password);

        when(gym1.getId()).thenReturn(gymID1);
        when(gym1.getName()).thenReturn("gym1");

        appointmentList = new ArrayList<>();
        when(appointment1.getId()).thenReturn(appointmentID1);
        when(appointment1.getStartTime()).thenReturn(LocalDateTime.now());
        when(appointment1.getCustomerName()).thenReturn("user1_uname");
        when(appointment1.getCustomer()).thenReturn(user1);
        when(appointment1.getLastUpdatedTime()).thenReturn(new Date());
        when(appointment1.getCustomerEmail()).thenReturn("user1@a.com");
        when(appointment1.getGym()).thenReturn(gym1);
        when(appointment1.getStartTime()).thenReturn(startTime);
        when(appointment1.getEndTime()).thenReturn(endTime);
        when(appointment1.getNote()).thenReturn("note for user1_uname");
        appointmentList.add(appointment1);

        when(appointment2.getId()).thenReturn(appointmentID2);
        when(appointment2.getStartTime()).thenReturn(LocalDateTime.now());
        when(appointment2.getCustomerName()).thenReturn("user2_uname");
        when(appointment2.getCustomer()).thenReturn(user2);
        when(appointment2.getLastUpdatedTime()).thenReturn(new Date());
        when(appointment2.getCustomerEmail()).thenReturn("user2@a.com");
        when(appointment2.getGym()).thenReturn(gym1);
        when(appointment2.getStartTime()).thenReturn(startTime);
        when(appointment2.getEndTime()).thenReturn(endTime);
        when(appointment2.getNote()).thenReturn("note for user2_uname");
        appointmentList.add(appointment2);

        when(appointmentRequestDto.getStartTime()).thenReturn(LocalDateTime.now());
        when(appointmentRequestDto.getEndTime()).thenReturn(LocalDateTime.now());
        when(appointmentRequestDto.getCustomerEmail()).thenReturn("newUser@a.com");

        when(appointmentUpdateTimeRequest.getStartTime()).thenReturn(LocalDateTime.now());
        when(appointmentUpdateTimeRequest.getEndTime()).thenReturn(LocalDateTime.now());

        appointments1 = new ArrayList<>();
        appointments2 = new ArrayList<>();
        appointments1.add(appointment1);
        appointments2.add(appointment2);
        //when(appointmentRepository.findAll()).thenReturn(appointmentList);
        //when(appointmentRepository.findById(appointmentID1)).thenReturn(Optional.ofNullable(appointment1));
        when(appointmentRepository.findAllByUserId(user1.getId())).thenReturn(appointments1);
        //when(appointmentRepository.countByGymIdAndStartTimeAndEndTime(gym1.getId(), startTime, endTime)).thenReturn(1);


    }

    @Test
    public void testListAppointmentByUser(){
        when(session.getAttribute("token")).thenReturn("user1@a.com");
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail("user1@a.com")).thenReturn(Optional.ofNullable(user1));

        assertEquals(1, appointmentService.listAppointmentByUser(session).size());
        assertThrows(BadRequestException.class, () -> appointmentService.listAppointmentByUser(null).size());
    }

    @Test
    public void testListAppointmentByUserNullCase(){

        when(session.getAttribute("token")).thenReturn("user1@a.com");
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail("user1@a.com")).thenReturn(Optional.ofNullable(user3));
        assertThrows(BadRequestException.class, () -> {
            appointmentService.listAppointmentByUser(session);
        });

    }

    @Test
    public void testFindAppointmentById(){
        when(appointmentRepository.findById(appointmentID1)).thenReturn(Optional.ofNullable(appointment1));
        assertNotNull(appointmentService.findAppointmentById(appointmentID1));
        assertEquals("note for user1_uname", appointmentService.findAppointmentById(appointmentID1).getNote());
    }

    @Test
    public void testCreate() throws AuthenticationError {
        when(appointmentResponseDto.getGymName()).thenReturn("gym1");
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        assertThrows(AuthenticationError.class, () -> { appointmentService.create(appointmentRequestDto, session);});
        when(appointmentRequestDto.getGymId()).thenReturn("0f14d0ab-9605-4a62-a9e4-5ed26688389b");
        when(gymRepository.findById(UUID.fromString("0f14d0ab-9605-4a62-a9e4-5ed26688389b"))).thenReturn(Optional.ofNullable(gym1));
        when(userRepository.getUserByEmail(any())).thenReturn(Optional.ofNullable(user1));
        assertThrows(BadRequestException.class, () -> appointmentService.create(appointmentRequestDto, session));
        when(appointmentRequestDto.getStartTime()).thenReturn(null);
        assertThrows(BadRequestException.class, () -> appointmentService.create(appointmentRequestDto, session));

        LocalDateTime nextTime = LocalDateTime.now().plusHours(2);
        LocalDateTime nextfutureTime = LocalDateTime.now().plusHours(4);
        when(appointmentRequestDto.getStartTime()).thenReturn(nextTime);
        when(appointmentRequestDto.getEndTime()).thenReturn(nextfutureTime);
        Map<String, Time> startTime = mock(HashMap.class);
        //startTime.put("startTime", new Time(now));

        Map<Integer, Map<String, Time>> tradingHour = mock(HashMap.class);

        when(gym1.getTradingHours()).thenReturn(tradingHour);
        when(tradingHour.get(any())).thenReturn(startTime);
        when(startTime.get("startTime")).thenReturn(new Time(new Date().getTime()));
        when(startTime.get("endTime")).thenReturn(new Time(new Date().getTime()));


        when(appointmentRepository.countByGymIdAndStartTimeAndEndTime(any(), any(), any())).thenReturn(1);
        assertThrows(BadRequestException.class, () -> appointmentService.create(appointmentRequestDto, session));


    }
    @Test
    public void testUpdate(){
        when(appointmentRepository.findById(appointmentID1)).thenReturn(Optional.ofNullable(appointment1));
        assertEquals("gym1",appointmentService.update(appointmentID1, appointmentUpdateTimeRequest).getGymName());
    }


    @Test
    public void testListAllForGymOwnerAuthError() throws AuthenticationError {
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail("user1@a.com")).thenReturn(Optional.ofNullable(user1));
        assertThrows(AuthenticationError.class, () -> { appointmentService.listAllForGymOwner(session);});
    }

    @Test
    public void testListAllForGymOwner() throws AuthenticationError {
        when(session.getAttribute("token")).thenReturn("user1@a.com");
        when(userService.getUserByToken(session)).thenReturn(user1);
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail(any())).thenReturn(Optional.ofNullable(user1));
        when(appointmentRepository.findAllByGymOwnerId(user1.getId())).thenReturn(appointments1);
        assertEquals(1, appointmentService.listAllForGymOwner(session).size());
    }

    @Test
    public void testCancelByGymOwner() throws AuthenticationError, IOException {
        when(appointmentRepository.findById(appointmentID1)).thenReturn(Optional.ofNullable(appointment1));
        Gym temp_gym = mock(Gym.class);
        User owner = mock(User.class);
        when(appointment1.getGym()).thenReturn(temp_gym);
        when(temp_gym.getOwner()).thenReturn(owner);
        when(owner.getId()).thenReturn(userID1);

        when(session.getAttribute("token")).thenReturn("user1@a.com");
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail("user1@a.com")).thenReturn(Optional.ofNullable(user1));
        assertThrows(BadRequestException.class, () -> appointmentService.cancelByGymOwner(appointmentID1, "new_note", session));
        when(appointment1.getStatus()).thenReturn(AppointmentStatus.PROCESSING);
        assertThrows(BadRequestException.class, () ->appointmentService.cancelByGymOwner(appointmentID1, "new_note", session));
    }

    @Test
    public void testUpdateStatusByUser() throws AuthenticationError, IOException {
        when(session.getAttribute("token")).thenReturn("user1@a.com");
        when(jtwUtil.getTokenEmail("user1@a.com")).thenReturn("user1@a.com");
        when(userRepository.getUserByEmail("user1@a.com")).thenReturn(Optional.ofNullable(user1));

        when(appointmentRepository.findById(appointmentID1)).thenReturn(Optional.ofNullable(appointment1));
        User customer = mock(User.class);
        when(appointment1.getCustomer()).thenReturn(customer);
        when(customer.getId()).thenReturn(userID1);
        when(user1.getId()).thenReturn(userID1);

        assertThrows(BadRequestException.class, () ->appointmentService.updateStatusByUser(appointmentID1, AppointmentStatus.PROCESSING, session));
        when(user1.getId()).thenReturn(userID2);
        assertThrows(AuthenticationError.class, () ->appointmentService.updateStatusByUser(appointmentID1, AppointmentStatus.PROCESSING, session));
        when(user1.getId()).thenReturn(userID1);
        when(appointment1.getStatus()).thenReturn(AppointmentStatus.PROCESSING);
        assertEquals("gym1", appointmentService.updateStatusByUser(appointmentID1, AppointmentStatus.PROCESSING, session).getGymName()); ;
    }

}
