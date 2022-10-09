package com.elec5619.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.elec5619.backend.entities.UserNew;
import org.springframework.data.repository.query.Param;

public interface UserNewRepository extends JpaRepository<UserNew, UUID> {

    UserNew getUserInstanceByEmail(String email);

    void deleteByEmail(String email);

    @Query(value = "select * from user u where u.email = ?1", nativeQuery = true)
    UserNew findByEmail(String email);
}
