package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.GymApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GymApplicationRepository extends JpaRepository<GymApplication, UUID> {
}
