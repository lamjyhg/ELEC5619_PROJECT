package com.elec5619.backend.dtos;

import com.elec5619.backend.entities.gymEnums.GymApplicationStatus;
import com.elec5619.backend.entities.gymEnums.GymApplicationType;
import com.elec5619.backend.entities.gymEnums.GymStatus;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

public class GymApplicationResponseDto {
    private UUID id;

    private String name;

    private String imageUrl;

    private Integer maximumOfAppointments;

    private Map<String, Double> geoLocation;

    private Map<String, Map<String, String>> tradingHours;

    private String address;

    private GymStatus status;

    private GymApplicationType gymApplicationType;

    private GymApplicationStatus gymApplicationStatus;

    private Date lastUpdatedTime;
}
