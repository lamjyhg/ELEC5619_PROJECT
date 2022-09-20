
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final GymMapper gymMapper;

    public List<GymResponseDto> findAll() {
        List<Gym> gymList = gymRepository.findAll();
        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public GymResponseDto findOneById(UUID id) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymMapper.fromEntity(foundGym);
    }

    public GymResponseDto create(GymRequestDto gymRequestDto) {
        Gym gym = gymMapper.toEntity(gymRequestDto);
        User user = userRepository.findById(UUID.fromString("1")).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id")));
        gym.setUser(user);
        gymRepository.save(gym);
        return gymMapper.fromEntity(gym);
    }

    public GymResponseDto update(UUID id, GymRequestDto gymRequestDto) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        Gym newGym = gymMapper.toEntity(gymRequestDto);
        newGym.setId(foundGym.getId());
        gymRepository.save(newGym);
        return gymMapper.fromEntity(newGym);
    }


}
