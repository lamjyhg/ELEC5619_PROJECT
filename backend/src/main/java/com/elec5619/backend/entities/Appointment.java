package com.elec5619.backend.entities;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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



    @Column(name = "status", nullable = false)
    private AppointmentStatus status;

    @ManyToOne
    @JoinColumn(name="gym_id", nullable = false)
    private Gym gym;


}
