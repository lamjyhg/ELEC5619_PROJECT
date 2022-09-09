
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymRequest;
import com.elec5619.backend.dtos.GymResponse;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final GymMapper gymMapper;

    public List<GymResponse> findAll() {
        List<Gym> gymList = gymRepository.findAll();
        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public GymResponse findOneById(UUID id) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymMapper.fromEntity(foundGym);
    }

    public GymResponse create(GymRequest gymRequest) {
        Gym gym = gymRepository.save(gymMapper.toEntity(gymRequest));
        return gymMapper.fromEntity(gym);
    }

    public GymResponse update(UUID id, GymRequest gymRequest) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        Gym newGym = gymMapper.toEntity(gymRequest);
        newGym.setGymId(foundGym.getGymId());
        gymRepository.save(newGym);
        return gymMapper.fromEntity(newGym);
    }


}
