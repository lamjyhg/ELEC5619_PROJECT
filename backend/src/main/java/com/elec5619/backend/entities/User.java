package com.elec5619.backend.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto inc
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "email", unique = false, nullable = false)
    private String email;

    @Column(name = "password", unique = false, nullable = false)
    private String password;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "name", unique = false, nullable = false)
    private String name;

    @Column(name = "type", unique = false, nullable = false)
    private String type;



    @Override
    public String toString(){
        return "\nid: " + this.id +
                "\nemail: " + this.email +
                "\npassword: " + this.password +
                "\nusername: " + this.username +
                "\nname: " + this.name +
                "\ntype: " + this.type;
    }

}
