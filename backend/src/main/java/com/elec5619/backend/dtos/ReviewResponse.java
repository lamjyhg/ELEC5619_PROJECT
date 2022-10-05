package com.elec5619.backend.dtos;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class ReviewResponse {

    private String comment;
    private String Date;
    private int rating;
    private String username;


}
