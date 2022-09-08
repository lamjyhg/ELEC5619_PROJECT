
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymGetDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final GymMapper gymMapper;

    public List<GymGetDto> listAll(){
        List<Gym> gymList = gymRepository.findAll();
        return gymList.stream().map(gym-> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }


}
