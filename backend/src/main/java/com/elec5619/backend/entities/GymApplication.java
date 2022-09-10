package com.elec5619.backend.entities;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Map;
import java.util.UUID;

@Data
@Entity
@Table(name = "gym_application")
@TypeDef(name = "json", typeClass = JsonType.class)
public class GymApplication {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "gym_application_id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID gymApplicationId;

    //    @ManyToOne
//    @JoinColumn(name="user_id",nullable = false)
    @Column(name="gym_id")
    private UUID gymId;

    @Column(name="user_id",nullable = false)
    private String userId;

    @Column(name = "name", nullable = false,length = 255)
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "maximum_of_appointments")
    private String maximumOfAppointments;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "geoLocation")
    private Map<String,Double> geoLocation;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "trading_hours")
    private Map<String,Map<String,String>> tradingHours;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "status", nullable = false)
    private GymApplicationStatus status;

    @Column(name = "type" , nullable = false)
    private GymApplicationType type;
};


