package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.gymEnums.GymStatus;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.sql.Time;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Data
public class AppointmentResponseDto {
    private UUID id;

    private Date startTime;

    private Date endTime;

    private Integer duration;

    private AppointmentStatus status;

    private Gym gym;
}
