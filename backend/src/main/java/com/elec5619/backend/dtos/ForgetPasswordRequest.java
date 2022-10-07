package com.elec5619.backend.dtos;


import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ForgetPasswordRequest {

    @NotBlank(message = "email should not be empty")
    String email;

}
