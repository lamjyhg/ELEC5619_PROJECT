package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Appointment;
import com.elec5619.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID>{
    Optional<List<Review>> findAllByGid(UUID gid);
}
