package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

//    public Optional<Appointment> findByIdAndGymId(final UUID appointmentId, final UUID gymId);

////    public List<Appointment> findAllByGymId(final UUID gymId);
    //@Query("select a from Appointment a ")
    @Query(value = " SELECT * From appointment join gym on gym.id = appointment.gym_id join user on user.id = gym.user_id where user.id = ?1 ;" , nativeQuery = true)
    public List<Appointment> findAllByGymOwnerId(@Param("userId") UUID userId);

    @Query("select a from Appointment a join User u on u.id = :userId")
    public List<Appointment> findAllByUserId(@Param("userId") UUID userId);
}
