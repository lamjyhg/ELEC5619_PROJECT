package com.elec5619.backend.dtos;

import com.elec5619.backend.utils.validators.InputStringValidator.DateTimeConstraint;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.time.LocalDateTime;

@Data
public class TimeAvailabilityRequestDto {

    @NotNull(message="startTime should not be null")
    @DateTimeConstraint(message = "startTime should be valid")
    private String startTimeString;

    @NotNull(message="endTime should not be null")
    @DateTimeConstraint(message = "endTime should be valid")
    private String endTimeString;


    public LocalDateTime getStartTime(){
        try{
            return LocalDateTime.parse(startTimeString, DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm"));
        }catch (Exception e) {
            return null;
        }
    }

    public LocalDateTime getEndTime(){
        try{
            return LocalDateTime.parse(endTimeString, DateTimeFormatter.ofPattern("uuuu-MM-dd HH:mm"));
        }catch (Exception e) {
            return null;
        }
    }


}
