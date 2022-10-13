package com.elec5619.backend.dtos;

import com.elec5619.backend.utils.validators.InputStringValidator.DateTimeConstraint;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Data
public class AppointmentUpdateTimeRequestDto {

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
