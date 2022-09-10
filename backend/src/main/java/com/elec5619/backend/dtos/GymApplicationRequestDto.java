package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.GymApplicationStatus;
import com.elec5619.backend.entities.GymApplicationType;
import com.elec5619.backend.utils.validators.GeoLocationConstraint;
import com.elec5619.backend.utils.validators.TradingHoursConstraint;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.util.Map;

@Data
public class GymApplicationRequestDto {
    @NotBlank(message = "userId should not be blank")
    private String userId;

    private String gymId;

    @NotBlank(message = "gym name should not be blank")
    private String name;

    @NotBlank(message = "image url should not be blank")
    private String imageUrl;

    //@Digits(integer = 3, fraction = 0, message = "maximum of appointments should be positive integer")
    @PositiveOrZero(message = "maximum of appointments should be positive integer")
    private Integer maximumOfAppointments;

    @GeoLocationConstraint
    private Map<String, Double> geoLocation;

    @TradingHoursConstraint
    private Map<String, Map<String, String>> tradingHours;

    @NotBlank(message = "address should not be blank")
    private String address;


    private GymApplicationType type;

}
