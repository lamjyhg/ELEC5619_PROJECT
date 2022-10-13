package com.elec5619.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class TimeAvailabilityRequestDto {
    @Future(message="startTime should be future")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @NotNull(message="startTime should not be null")
    private LocalDateTime startTime;

    @Future(message="endTime should be future")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @NotNull(message="endTime should not be null")
    private LocalDateTime endTime;



    @AssertTrue(message="startTime should be before endTime")
    public boolean isValidRange() {
        System.out.println(1111);
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
