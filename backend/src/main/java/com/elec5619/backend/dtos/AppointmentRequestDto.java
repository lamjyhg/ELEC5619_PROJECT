package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.utils.validators.InputStringValidator.DateTimeConstraint;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.sql.Time;
import java.time.LocalDateTime;

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


    @NotNull(message="startTime should not be null")
    @DateTimeConstraint(message = "startTime should be valid")
    private String startTimeString;

    @NotNull(message="endTime should not be null")
    @DateTimeConstraint(message = "endTime should be valid")
    private String endTimeString;

    @NotNull(message="not should not be null")
    private String note;


    public LocalDateTime getStartTime(){
        try{
            return LocalDateTime.parse(startTimeString, DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm"));
        }catch (Exception e) {
            return null;
        }
    }

    public LocalDateTime getEndTime(){
        try{
            LocalDateTime localDateTime =  LocalDateTime.parse(endTimeString, DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm"));
            return localDateTime;
        }catch (Exception e) {
            return null;
        }
    }


}
