package com.elec5619.backend.dtos;


import lombok.Data;

import javax.persistence.Column;

@Data
public class UserResponse {

    private Long id;
    private String email;
    private String password;
    private String username;
    private String name;
    private String type;

}


