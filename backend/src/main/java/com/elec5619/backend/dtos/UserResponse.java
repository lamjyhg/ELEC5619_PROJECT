package com.elec5619.backend.dtos;


import lombok.Data;

import javax.persistence.Column;
import java.util.UUID;

@Data
public class UserResponse {

    private UUID id;
    private String email;
    private String password;
    private String username;
    private String name;
    private String type;

}


