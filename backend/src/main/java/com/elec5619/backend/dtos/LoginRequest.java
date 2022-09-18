package com.elec5619.backend.dtos;

import com.elec5619.backend.utils.validators.InputStringValidator.EmailFormatConstraint;
import com.elec5619.backend.utils.validators.InputStringValidator.InputSecurityConstraint;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {


    @NotBlank(message = "email cannot be empty")
    @InputSecurityConstraint
    @EmailFormatConstraint
    private String email;
    @NotBlank(message = "password cannot be empty")
    @InputSecurityConstraint
    private String password;

}
