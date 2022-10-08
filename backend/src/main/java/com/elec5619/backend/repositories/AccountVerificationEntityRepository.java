package com.elec5619.backend.repositories;

import com.elec5619.backend.entities.AccountActivationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountActivationEntityRepository extends JpaRepository<AccountActivationEntity, UUID> {

}
