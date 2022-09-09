package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface GymRepository extends JpaRepository<Gym, UUID> {
    //@Query("SELECT JSON_VALUE(GEOLOCATOON, '$.lat') AS LAT, JSON_VALUE(GEOLOCATOON, '$.lat') AS LAT")
    //public List<Gym> findNearbyGymsByCurrentLocationAndDistance(@Param("latitude") Double latitude,@Param("longitude") Double longitude);

}
