package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.GymApplicationStatus;
import com.elec5619.backend.entities.GymApplicationType;
import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
public class GymApplicationResponseDto {
    private UUID gymApplicationId;

    private String userId;

    private String name;

    private String imageUrl;

    private Integer maximumOfAppointments;

    private Map<String, Double> geoLocation;

    private Map<String, Map<String, String>> tradingHours;

    private String address;

    private GymApplicationStatus status;

    private GymApplicationType type;
}
