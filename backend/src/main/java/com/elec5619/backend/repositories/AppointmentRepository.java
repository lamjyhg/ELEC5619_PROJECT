package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

//    public Optional<Appointment> findByIdAndGymId(final UUID appointmentId, final UUID gymId);

////    public List<Appointment> findAllByGymId(final UUID gymId);
    @Query("select a from Appointment a join Gym g join User u on u.id = :userId ")
    public List<Appointment> findAllByGymOwnerId(@Param("userId") UUID userId);


}
