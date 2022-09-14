package com.elec5619.backend.mappers;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.entities.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppointmentMapper {
    Appointment toEntity(AppointmentRequestDto appointmentRequestDto);
    AppointmentResponseDto fromEntity(Appointment appointment);
}
