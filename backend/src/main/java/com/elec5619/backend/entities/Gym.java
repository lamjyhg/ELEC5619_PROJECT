package com.elec5619.backend.entities;
import com.elec5619.backend.entities.gymEnums.GymApplicationStatus;
import com.elec5619.backend.entities.gymEnums.GymApplicationType;
import com.elec5619.backend.entities.gymEnums.GymStatus;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.util.*;

import org.hibernate.annotations.GenericGenerator;

@Data
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
    @Column(name = "id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID id;


    @Column(name = "description", nullable = false,length = 255)
    private String description;

    @Column(name = "name", nullable = false,length = 255)
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "maximum_of_appointments")
    private Integer maximumOfAppointments;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "geoLocation")
    private Map<String,Double> geoLocation;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "trading_hours")
    private Map<Integer, Map<String, Time>> tradingHours;


    @Column(name = "address", nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "gym")
    private Collection<Appointment> appointments = new ArrayList<Appointment>();


    @Column(name="last_updated_time", nullable = false)
    private Date lastUpdatedTime = new Date();

    @Column(name="gym_application_status", nullable = false)
    private GymApplicationStatus gymApplicationStatus = GymApplicationStatus.PENDING;

    @Column(name="gym_application_type", nullable = false)
    private GymApplicationType gymApplicationType;

    @Column(name="gym_status",nullable = false)
    private GymStatus gymStatus = GymStatus.PRIVATE;

    public void addAppointment(Appointment appointment){
        appointments.add(appointment);
    }

    @Transient
    public String getPhotosImagePath() {
        if (imageUrl == null || id == null) return null;
        return "/gym-photos/" + id + "/" + imageUrl;
    }

}
