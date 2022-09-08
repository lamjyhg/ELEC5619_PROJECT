package com.elec5619.backend.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.Map;

@Data
public class GymPostDto {

    //@NotNull
    private String userId;

    //@NotBlank
    private String name;

    //@NotBlank
    private String imageUrl;

    //@Min(0)
    private Integer maximumOfAppointments;

    private Map<String, Double> geoLocation;

    private Map<String, Map<String, String>> tradingHours;

   // @NotBlank
    private String address;

//    public GymPostDto(String userId, String name, String imageUrl, Integer maximumOfAppointments,
//                      Map<String, Double> geoLocation,
//                      Map<String, Map<String, String>> tradingHours,
//                      String address) {
//        this.userId = userId;
//        this.name = name;
//        this.imageUrl = imageUrl;
//        this.maximumOfAppointments = maximumOfAppointments;
//        this.geoLocation = geoLocation;
//        this.tradingHours = tradingHours;
//        this.address = address;
//    }

}
