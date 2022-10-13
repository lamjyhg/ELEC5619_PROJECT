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



    @Future(message="startTime should be future")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @NotNull(message="startTime should not be null")
    private LocalDateTime startTime;

    @Future(message="endTime should be future")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @NotNull(message="endTime should not be null")
    private LocalDateTime endTime;

    @NotNull(message="not should not be null")
    private String note;


    @AssertTrue(message="startTime should be before endTime")
    public boolean isValidRange() {
        if(startTime == null || endTime == null){
            return false;
        }
        return endTime.compareTo(startTime) > 0;
    }

    @AssertTrue(message="startTime and endTime should be same date")
    public boolean startTimeSameDateEndTime() {
        if(startTime == null || endTime == null){
            return false;
        }
        return startTime.getYear() == endTime.getYear() && startTime.getMonth() == endTime.getMonth() && startTime.getDayOfMonth() == endTime.getDayOfMonth();
    }
}
