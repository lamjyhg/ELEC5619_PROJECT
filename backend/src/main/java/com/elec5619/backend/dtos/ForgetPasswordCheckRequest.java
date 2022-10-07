package com.elec5619.backend.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ForgetPasswordCheckRequest {

    @NotBlank(message = "token should not be empty")
    String hash;

}
