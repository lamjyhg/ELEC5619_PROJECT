package com.elec5619.backend.mappers;


import com.elec5619.backend.dtos.LoginRequest;
import com.elec5619.backend.dtos.UserResponse;
import com.elec5619.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LoginMapper {

    User toEntity(LoginRequest user);
    UserResponse fromEntity(User user);

}
