package com.elec5619.backend.mappers;
import com.elec5619.backend.dtos.GymRequest;
import com.elec5619.backend.dtos.GymResponse;
import com.elec5619.backend.entities.Gym;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GymMapper {

    Gym toEntity(GymRequest gamePostDto);

    GymResponse fromEntity(Gym game);
}