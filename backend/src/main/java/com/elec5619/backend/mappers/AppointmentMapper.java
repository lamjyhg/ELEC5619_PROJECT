package com.elec5619.backend.mappers;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.Gym;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AppointmentMapper {


    Appointment toEntity(AppointmentRequestDto appointmentRequestDto);

    @Mapping(source = "gym", target = "gymName", qualifiedByName = "gymIdToGymName")
    AppointmentResponseDto fromEntity(Appointment appointment);

    @Named("gymIdToGymName")
    public static String gymIdToGymName(Gym gym) {
        return gym.getName();
    }
}
