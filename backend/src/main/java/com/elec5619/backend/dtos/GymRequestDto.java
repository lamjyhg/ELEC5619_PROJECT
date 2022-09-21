
package com.elec5619.backend.dtos;

import com.elec5619.backend.utils.validators.GeoLocationConstraint;
import com.elec5619.backend.utils.validators.TradingHoursConstraint;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;

import javax.validation.constraints.*;

import java.sql.Time;
import java.util.Map;
import java.util.UUID;

@Data
//@ConditionalValid(field = "name", dependentFields = {"firstName", "lastName"}, message = "Either name or first name and last name are required")
public class GymRequestDto {

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
    private Map<Integer, Map<String, Time>> tradingHours;

    @NotBlank(message = "address should not be blank")
    private String address;


}

