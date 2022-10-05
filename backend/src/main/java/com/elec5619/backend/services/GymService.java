
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.gymEnums.GymApplicationType;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpSession;
import javax.annotation.security.RolesAllowed;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final GymMapper gymMapper;
    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    public List<GymResponseDto> findAll(HttpSession session) {
        List<Gym> gymList = gymRepository.findAll();

        System.out.println("***********************************");
        userService.getUserRole(session);


        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }


    public List<GymResponseDto> findAllNearby(Double latitude,Double longitude) {
        List<Gym> gymList = gymRepository.findNearbyGymsByCurrentLocation(latitude,longitude);
        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public GymResponseDto findOneById(UUID id) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymMapper.fromEntity(foundGym);
    }

    public GymResponseDto create(GymRequestDto gymRequestDto, HttpSession session) throws AuthenticationError {
        User user = userService.getUserByToken(session);
        Gym gym = gymMapper.toEntity(gymRequestDto);
        gym.setUser(user);
        gym.setGymApplicationType(GymApplicationType.CREATE);
        user.addGyms(gym);
        userRepository.save(user);
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
