package com.elec5619.backend.utils;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import java.util.Map;
@Getter
@Setter
public class GymApplicationForm {

    private String userId;
    private String name;
    private String imageUrl;
    private Integer maximumAppointments;
    private Map<String,Double> geoLocation;
    private Map<String,Map<String,String>> tradingHours;
    private String address;

    public GymApplicationForm(String userId, String name,
                              String imageUrl, Integer maximumAppointments,
                              Map<String,Double> geoLocation,
                              Map<String,Map<String,String>> tradingHours,
                              String address){
        this.userId = userId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.maximumAppointments = maximumAppointments;
        this.geoLocation = geoLocation;
        this.tradingHours = tradingHours;
        this.address= address;
    }

}
