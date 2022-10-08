package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.AccountVerificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountVerificationEntityRepository extends JpaRepository<AccountVerificationEntity, UUID> {

}
