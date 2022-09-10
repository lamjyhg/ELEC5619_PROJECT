package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymApplicationRequestDto;
import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.GymApplication;
import com.elec5619.backend.entities.GymApplicationStatus;
import com.elec5619.backend.entities.GymApplicationType;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.GymApplicationMapper;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymApplicationRepository;
import com.elec5619.backend.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymApplicationService {
    private final GymRepository gymRepository;
    private final GymMapper gymMapper;
    private final GymApplicationRepository gymApplicationRepository;
    private final GymApplicationMapper gymApplicationMapper;

    public List<GymApplicationResponseDto> findAll() {
        List<GymApplication> gymApplications = gymApplicationRepository.findAll();
        return gymApplications.stream().map(gymApplication -> gymApplicationMapper.fromEntity(gymApplication)).collect(Collectors.toList());
    }

    public GymApplicationResponseDto findOneById(UUID id) {
        GymApplication gymApplication = gymApplicationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymApplicationMapper.fromEntity(gymApplication);
    }

    public GymApplicationResponseDto create(GymApplicationRequestDto gymApplicationRequestDto){
        GymApplication gymApplication =gymApplicationMapper.toEntity(gymApplicationRequestDto);
        gymApplication.setStatus(GymApplicationStatus.PENDING);
        System.out.println(1111);
        gymApplicationRepository.save(gymApplication);
        return gymApplicationMapper.fromEntity(gymApplication);
    }

    public GymApplicationResponseDto updateStatus(UUID id, GymApplicationStatus status){
        GymApplication foundGymApplication = gymApplicationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        if(foundGymApplication.getGymId()==null || foundGymApplication.getType() == GymApplicationType.UPDATE){
            throw  new IllegalArgumentException("can not update without gymId");
        }
        if(status == GymApplicationStatus.PENDING || foundGymApplication.getStatus() != GymApplicationStatus.PENDING){
            throw new BadRequestException("Invalid status update");
        }
        foundGymApplication.setStatus(status);
        gymApplicationRepository.save(foundGymApplication);

        Gym gym = gymMapper.fromGymApplication(foundGymApplication);
        if(foundGymApplication.getGymId() != null){
            gym.setGymId(foundGymApplication.getGymApplicationId());
        }
        gymRepository.save(gym);
        // send email


        return gymApplicationMapper.fromEntity(foundGymApplication);
    }


}
