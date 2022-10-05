package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

@Data
public class AppointmentRequestDto {

    @NotBlank(message = "gymId should not be blank")
    private String gymId;

    @NotBlank(message = "customer name should not be blank")
    private String customerName;

    @Email(message = "email should be valid")
    private String customerEmail;

    @PositiveOrZero(message = "duration should be positive (hr)")
    private Double duration;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTime;

    @NotBlank(message = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;

    @NotNull(message="not should not be null")
    private String note;
}
