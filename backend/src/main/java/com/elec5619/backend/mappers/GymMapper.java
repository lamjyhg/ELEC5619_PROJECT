package com.elec5619.backend.mappers;
import com.elec5619.backend.dtos.GymGetDto;
import com.elec5619.backend.dtos.GymPostDto;
import com.elec5619.backend.entities.Gym;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GymMapper {

    Gym toEntity(GymPostDto gamePostDto);

    GymGetDto fromEntity(Gym game);
}