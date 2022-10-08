package com.elec5619.backend.dtos;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ForgetPasswordResetRequest {

    @NotBlank
    String password;

    @NotBlank
    String hash;

}
