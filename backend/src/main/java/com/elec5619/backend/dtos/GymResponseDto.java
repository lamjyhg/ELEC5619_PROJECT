package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.gymEnums.GymStatus;
import lombok.Data;

import java.sql.Time;
import java.util.Map;
import java.util.UUID;

@Data
public class GymResponseDto {
    private UUID id;

    private String name;

    private String description;

    private String imageUrl;

    private Integer maximumOfAppointments;

    private Map<String, Double> geoLocation;

    private Map<Integer, Map<String, Time>> tradingHours;

    private String address;

    private GymStatus status;
}
