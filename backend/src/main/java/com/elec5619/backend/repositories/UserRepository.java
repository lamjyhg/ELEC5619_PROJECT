package com.elec5619.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elec5619.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByEmailAndPassword(String email, String password);

    Optional<User> getUserByUsername(String username);
}
