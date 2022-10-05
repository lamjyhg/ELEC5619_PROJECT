package com.elec5619.backend.services;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;

import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.AppointmentMapper;
import com.elec5619.backend.repositories.AppointmentRepository;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final GymRepository gymRepository;
    private final UserService userService;
    //private final UserMapper userMapper;
    private final AppointmentMapper appointmentMapper ;
    private final UserRepository userRepository;
    private final EmailSendingHandler emailSendingHandler = new EmailSendingHanlderImple();

    public List<AppointmentResponseDto> listAppointmentByUser(HttpSession session){
        UUID userId = userService.getUserId(session);
        System.out.println(userId);
        if(userId == null) {
            throw new BadRequestException("No session provided");
        }
        List<Appointment> appointments = new ArrayList<>();
        appointments = appointmentRepository.findAllByUserId(userId);
        return appointments
                .stream()
                .map(appointment -> appointmentMapper.fromEntity(appointment)).collect(Collectors.toList());
    }
    public AppointmentResponseDto findAppointmentById(UUID id){
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return appointmentMapper.fromEntity(appointment);
    }

    public AppointmentResponseDto create(AppointmentRequestDto appointmentRequestDto, HttpSession session) throws AuthenticationError {

        User customer = userService.getUserByToken(session);
        Gym gym = gymRepository.findById(UUID.fromString(appointmentRequestDto.getGymId())).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown gym id ")));
        // check there is available
        System.out.println(gym.getId());

        Appointment appointment = appointmentMapper.toEntity(appointmentRequestDto);
        appointment.setCustomer(customer);
        appointment.setGym(gym);
        gym.addAppointment(appointment);
        gymRepository.save(gym);
        appointmentRepository.save(appointment);


        return appointmentMapper.fromEntity(appointment);
    }

//    public AppointmentResponseDto create(HttpSession session, AppointmentRequestDto appointmentRequest) {
//        Appointment appointment = appointmentMapper.toEntity(appointmentRequest);
//        //link user
//        UUID userId = userService.getUserId(session);
//        System.out.println(userId);
//        if(userId == null) {
//            throw new BadRequestException("No session provided");
//        }
//        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", userId)));
//        UUID gymId = UUID.fromString(appointmentRequest.getGymId());
//        //Check if gym appointment full
//        Gym gym = gymRepository.findById(gymId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", gymId)));
//        System.out.println(gym.getAppointments());
//        Integer currentAppointment = gym.getAppointments().size();
//        Integer maxAppointments = Integer.parseInt(gym.getMaximumOfAppointments());
//        if( currentAppointment >= maxAppointments ){
//            throw new BadRequestException("Appointments limit has been reached.");
//        }
//        appointment.setGym(gym);
//        appointment.setUser(user);
//        appointment.setStatus(AppointmentStatus.PROCESSING);
//        Appointment newAppointment  = appointmentRepository.save(appointment);
//        return appointmentMapper.fromEntity(newAppointment);
//    }




    public AppointmentResponseDto update(UUID id,AppointmentRequestDto appointmentRequest) {
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Unknown id"));

        appointmentRepository.save(appointment);
        // get user email to send
        return appointmentMapper.fromEntity(appointment);
    }

    public List<AppointmentResponseDto> listAllForGymOwner( HttpSession session) throws AuthenticationError {
        {

            User gymOwner = userService.getUserByToken(session);
            List<Appointment> appointments = appointmentRepository.findAllByGymOwnerId(gymOwner.getId());
            return appointments
                    .stream()
                    .map(appointment -> appointmentMapper.fromEntity(appointment)).collect(Collectors.toList());
        }


    }
    public AppointmentResponseDto cancelByGymOwner(UUID id, String comment,   HttpSession session) throws AuthenticationError, IOException {
        User owner = userService.getUserByToken(session);
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Unknown id"));

        if(appointment.getGym().getUser().getId() != owner.getId()){
            throw new AuthenticationError("You are not authorized to make requests for this appointment");
        }

        if (appointment.getStatus() != AppointmentStatus.PROCESSING
        ) {
            throw new BadRequestException("Invalid status update");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        // get user email to send
//        String toEmail = appointment.getCustomerEmail();
//        String content = comment;
//        emailSendingHandler.send(toEmail, String.format("appointment %s cancelled", appointment.getId()), content);



        return appointmentMapper.fromEntity(appointment);


    }

}
