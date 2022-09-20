package com.elec5619.backend.dtos;

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
}
