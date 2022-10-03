
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.gymEnums.GymApplicationType;
import com.elec5619.backend.entities.gymEnums.GymStatus;
import com.elec5619.backend.exceptions.BadRequestException;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final GymMapper gymMapper;

    private final UserService userService;

    public List<GymResponseDto> findAll(HttpSession session) {
        List<Gym> gymList = gymRepository.findAll();

        System.out.println("***********************************");
        userService.getUserRole(session);


        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public List<GymResponseDto> findAllNearby(Double latitude,Double longitude, HttpSession session) {

        System.out.println("***********************************");
        userService.getUserRole(session);

        List<Gym> gymList = gymRepository.findNearbyGymsByCurrentLocation(latitude,longitude);
        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public GymResponseDto findOneById(UUID id) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymMapper.fromEntity(foundGym);
    }
    
    public GymResponseDto create(HttpSession session,GymRequestDto gymRequestDto) {
        Gym gym = gymMapper.toEntity(gymRequestDto);
        UUID userId = userService.getUserId(session);
        if(userId == null) {
            throw new BadRequestException("No session provided");
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", userId)));
        gym.setUser(user);
        gym.setGymApplicationType(GymApplicationType.CREATE);
        gymRepository.save(gym);
        return gymMapper.fromEntity(gym);
    }

    public GymResponseDto update(UUID id, GymRequestDto gymRequestDto) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        Gym newGym = gymMapper.toEntity(gymRequestDto);
        newGym.setId(foundGym.getId());
        newGym.setGymApplicationType(GymApplicationType.UPDATE);
        gymRepository.save(newGym);
        return gymMapper.fromEntity(newGym);
    }


}
