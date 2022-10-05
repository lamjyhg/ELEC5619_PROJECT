package com.elec5619.backend.entities;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.time.LocalDateTime;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User customer;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

    @ManyToOne
    @JoinColumn(name="gym_id", nullable = false)
    private Gym gym;

    @Column(name = "duration", nullable = false)
    private Double duration;

    @Column(name="start_time",nullable = false)
    private Date startTime;

    @Column(name = "status", nullable = false)
    private AppointmentStatus status = AppointmentStatus.PROCESSING;

    @Column(name="note")
    private String note;

}
