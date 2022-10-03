package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.utils.validators.GeoLocationConstraint;
import com.elec5619.backend.utils.validators.TradingHoursConstraint;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.sql.Time;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Data
public class AppointmentRequestDto{
    @NotBlank(message = "startTime should not be blank")

    private Date startTime;

    @NotBlank(message = "endTime should not be blank")
    private Date endTime;

    @NotBlank(message = "duration should not be blank")
    private Integer duration;

    @NotBlank(message = "gymId should not be blank")
    private String gymId;
}
