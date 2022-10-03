package com.elec5619.backend.services;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;

import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
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
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final GymRepository gymRepository;
    private final UserService userService;
    //private final UserMapper userMapper;
    private final AppointmentMapper appointmentMapper;
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

    public AppointmentResponseDto create(HttpSession session, AppointmentRequestDto appointmentRequest) {
        Appointment appointment = appointmentMapper.toEntity(appointmentRequest);
        //link user
        UUID userId = userService.getUserId(session);
        System.out.println(userId);
        if(userId == null) {
            throw new BadRequestException("No session provided");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", userId)));
        UUID gymId = UUID.fromString(appointmentRequest.getGymId());
        //Check if gym appointment full
        Gym gym = gymRepository.findById(gymId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", gymId)));
        Integer currentAppointment = gym.getAppointments().size();
        Integer maxAppointments = Integer.parseInt(gym.getMaximumOfAppointments());
        System.out.println(currentAppointment);
        System.out.println(maxAppointments);
        if( currentAppointment >= maxAppointments ){
            throw new BadRequestException("Appointments limit has been reached.");
        }
        appointment.setGym(gym);
        appointment.setUser(user);
        appointment.setStatus(AppointmentStatus.PROCESSING);
        System.out.println(appointment);
        appointmentRepository.save(appointment);
        return appointmentMapper.fromEntity(appointment);
    }

    public AppointmentResponseDto update(UUID id,AppointmentRequestDto appointmentRequest) {
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Unknown id"));

        appointmentRepository.save(appointment);
        // get user email to send
        return appointmentMapper.fromEntity(appointment);
    }

    public List<AppointmentResponseDto> listAllForGymOwner() {

        List<Appointment> appointments = new ArrayList<Appointment>();

        //appointments = appointmentRepository.findAllByGymOwnerId(UUID.fromString("40e72a56-b479-4e72-a81c-c248fef6ecd3"));
        List<Gym> gyms =new ArrayList<>();


        return appointments
                .stream()
                .map(appointment -> appointmentMapper.fromEntity(appointment)).collect(Collectors.toList());
    }

    public AppointmentResponseDto cancelByGymOwner(UUID id, String comment) {
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Unknown id"));

        //check owner ?

        if (appointment.getStatus() != AppointmentStatus.PROCESSING) {
            throw new BadRequestException("Invalid status update");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);

        // get user email to send
        return appointmentMapper.fromEntity(appointment);


    }

}
