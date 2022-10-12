package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface GymRepository extends JpaRepository<Gym, UUID> {
    @Query(value = "SELECT * FROM (\n" +
            "    SELECT *, \n" +
            "        (\n" +
            "            (\n" +
            "                (\n" +
            "                    acos(\n" +
            "                        sin(( ?1 * pi() / 180))\n" +
            "                        *\n" +
            "                        sin(( json_value(geo_location,'$.lat') * pi() / 180)) + cos(( ?1 * pi() /180 ))\n" +
            "                        *\n" +
            "                        cos(( json_value(geo_location,'$.lat') * pi() / 180)) * cos((( ?2 - json_value(geo_location,'$.lng')) * pi()/180)))\n" +
            "                ) * 180/pi()\n" +
            "            ) * 60 * 1.1515\n" +
            "        )\n" +
            "    as distance FROM Gym\n" +
            ") myTable order by distance" , nativeQuery = true)
    public List<Gym> findNearbyGymsByCurrentLocation(@Param("latitude") Double latitude,@Param("longitude") Double longitude);

    @Query(value = "SELECT * FROM gym WHERE gym_application_status=0;" , nativeQuery = true)
    public List<Gym> getPendingGymRequests();

    public List<Gym> findAllByOwnerId(UUID ownerId);

    @Query(value = "SELECT * FROM gym WHERE name like ?1 ;" , nativeQuery = true)
    public List<Gym> findAllGymBySearchWord(@Param("searchWord") String searchWord);
}
