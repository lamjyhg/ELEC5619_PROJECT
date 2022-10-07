package com.elec5619.backend.dtos;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.*;

@Data
public class ReviewRequest {

    @NotNull
    @NotBlank
    private String comment;


    @NotNull
    @NotBlank
    private String date;


    @NotNull
    private int star;


    @NotNull
    private UUID gid;

    @NotNull
    private UUID uid;



}
