package com.elec5619.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.elec5619.backend.entities.User;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByEmailAndPassword(String email, String password);

    Optional<User> getUserByUsername(String username);


    Optional<User> getUserByName(String username);
    User getUserInstanceByEmail(String email);

    void deleteByEmail(String email);

    @Query(value = "select * from user u where u.email = ?1", nativeQuery = true)
    User findByEmail(String email);
}
