package com.elec5619.backend.entities;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.Map;
import java.util.UUID;
import org.hibernate.annotations.GenericGenerator;

@Getter
@Setter
@Entity
@Table(name = "gym")
@TypeDef(name = "json", typeClass = JsonType.class)
public class Gym {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "gym_id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

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


}
