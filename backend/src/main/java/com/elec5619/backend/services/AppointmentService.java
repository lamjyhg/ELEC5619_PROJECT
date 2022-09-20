package com.elec5619.backend.services;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.dtos.UserRequest;
import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.AppointmentMapper;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.repositories.AppointmentRepository;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final GymRepository gymRepository;
    private final UserMapper userMapper;
    private final AppointmentMapper appointmentMapper;
    private final UserRepository userRepository;
    private final EmailSendingHandler emailSendingHandler = new EmailSendingHanlderImple();


    public List<AppointmentResponseDto> listAllForGymOwner() {

        List<Appointment> appointments = new ArrayList<Appointment>();
        UserRequest userRequest = new UserRequest();
        userRequest.setEmail("123@gmail.com");
        userRequest.setUsername("us");
        userRequest.setPassword("sss");
        userRequest.setType("sss");
        userRequest.setName("n");

        User user = userMapper.toEntity(userRequest);
        user.setId(UUID.fromString("40e72a56-b479-4e72-a81c-c248fef6ecd3"));
        userRepository.save(user);
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
