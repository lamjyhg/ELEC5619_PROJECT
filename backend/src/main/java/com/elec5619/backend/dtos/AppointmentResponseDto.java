package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
public class AppointmentResponseDto {

    private UUID id;

    private String gymName;

    private String customerName;

    private String customerEmail;

    private String startTime;

    private String endTime;

    private AppointmentStatus status;

    private String note;
}
