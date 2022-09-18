package com.elec5619.backend.dtos;

import com.elec5619.backend.utils.validators.InputStringValidator.EmailFormatConstraint;
import com.elec5619.backend.utils.validators.InputStringValidator.InputSecurityConstraint;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class RegisterRequest {

    // @NotNull(message = "id cannot be empty")
    // private Long id;
    @NotBlank(message = "email cannot be empty")
    @InputSecurityConstraint
    @EmailFormatConstraint
    private String email;
    @NotBlank(message = "password cannot be empty")
    @InputSecurityConstraint
    private String password;
    @NotBlank(message = "username cannot be empty")
    @InputSecurityConstraint
    private String username;
    @NotBlank(message = "name cannot be empty")
    @InputSecurityConstraint
    private String name;
    @NotBlank(message = "type cannot be empty")
    @InputSecurityConstraint
    private String type;

}
