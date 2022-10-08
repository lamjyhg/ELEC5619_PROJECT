package com.elec5619.backend.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
public class ResetPasswordRequest {



    @NotBlank(message = "password cannot be black")
    String password;

    @NotBlank (message = "password cannot be blank")
    String oldPassword;

}
