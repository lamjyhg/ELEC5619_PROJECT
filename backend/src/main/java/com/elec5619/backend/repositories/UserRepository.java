package com.elec5619.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elec5619.backend.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByEmailAndPassword(String email, String password);

    Optional<User> getUserByUsername(String username);


    Optional<User> getUserByName(String username);
}
