package com.elec5619.backend.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;


@Getter
@Setter
@Entity
@Table(name = "Role")
public class Role {



    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )



    @Column(nullable = false)
    private UUID role_id;
    @Column(nullable = false)
    private String name;


    public Role(){

    }

    public Role(String name){
        this.name = name;
    }

}
