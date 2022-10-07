package com.elec5619.backend.entities;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "User_forget_password")
public class UserForgetPassword {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID id;

    @Column(name = "hash", unique = false, nullable = false)
    private String hash;

    @Column(name = "date", unique = false, nullable = false)
    private String date;

    @Column(name = "uid", columnDefinition = "BINARY(16)",unique = false, nullable = false)
    private UUID uid;

}
