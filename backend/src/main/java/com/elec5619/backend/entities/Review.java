package com.elec5619.backend.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;


@Getter
@Setter
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID id;



    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "comment", nullable = false)
    private String comment;



    @Column(name = "date" , nullable = false)
    private String date;

    @Column(name = "gid" , nullable = false, columnDefinition = "BINARY(16)")
    private UUID gid;


    @Column(name = "uid" , nullable = false)
    private UUID uid;

    @Column(name = "username", nullable = false)
    private String username;



}


