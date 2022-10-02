package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.Role;
import com.elec5619.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> getRoleByName(String name);
}
