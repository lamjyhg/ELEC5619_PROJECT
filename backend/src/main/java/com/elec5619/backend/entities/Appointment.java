package com.elec5619.backend.entities;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "appointment")
@TypeDef(name = "json", typeClass = JsonType.class)
public class Appointment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
    private UUID id;

    @Column(name = "startTime", nullable = false)
    private Date startTime;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "endTime", nullable = false)
    private Date endTime;

    @Column(name = "status", nullable = false)
    private AppointmentStatus status;


    @Column(name="last_updated_time", nullable = false)
    private Date lastUpdatedTime = new Date();

    @ManyToOne
    @JoinColumn(name="gym_id", nullable = false)
    private Gym gym;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;
}
