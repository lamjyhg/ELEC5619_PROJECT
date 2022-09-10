package com.elec5619.backend.mappers;
import com.elec5619.backend.dtos.GymApplicationRequestDto;
import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.GymApplication;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GymApplicationMapper {
    GymApplication toEntity(GymApplicationRequestDto gymApplicationRequestDto);

    GymApplicationResponseDto fromEntity(GymApplication gymApplication);


}
