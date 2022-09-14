package com.elec5619.backend.services;

import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.AppointmentMapper;
import com.elec5619.backend.repositories.AppointmentRepository;
import com.elec5619.backend.utils.EmailSendingHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final EmailSendingHandler emailSendingHandler;
    //private final

    public List<AppointmentResponseDto> listAllForGymOwner(UUID gymId) {
        List<Appointment> appointments = appointmentRepository.findAllByGymId(gymId);
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
