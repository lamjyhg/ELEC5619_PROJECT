package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.gymEnums.GymStatus;
import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
public class GymResponseDto {
    private UUID id;

    private String name;

    private String imageUrl;

    private Integer maximumOfAppointments;

    private Map<String, Double> geoLocation;

    private Map<String, Map<String, String>> tradingHours;

    private String address;

    private GymStatus status;
}
