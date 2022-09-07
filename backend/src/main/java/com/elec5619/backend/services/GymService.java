
package com.elec5619.backend.services;

import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.repositories.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;

    public List<Gym> listAll(){
        List<Gym> gymList = gymRepository.findAll();
        return gymList;
    }
}
