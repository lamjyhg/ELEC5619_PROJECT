package com.elec5619.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

@Data
public class AppointmentUpdateTimeRequestDto {

    @Future(message="startTime should be future")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date startTime;

    @Future(message="endTime should be future")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    
    @AssertTrue(message="startTime should be before endTime")
    public boolean isValidRange() {
        return endTime.compareTo(startTime) > 0;
    }
}
