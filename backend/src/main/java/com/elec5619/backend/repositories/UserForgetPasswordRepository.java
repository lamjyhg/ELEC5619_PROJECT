package com.elec5619.backend.repositories;


import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.UserForgetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserForgetPasswordRepository extends JpaRepository<UserForgetPassword, UUID> {

    Optional<UserForgetPassword> getUserForgetPasswordByUid(UUID uid);
    Optional<UserForgetPassword> getUserForgetPasswordByHash(String Hash);
}
