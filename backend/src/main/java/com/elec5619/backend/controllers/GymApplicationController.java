package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.GymApplicationRequestDto;
import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.GymApplicationStatus;
import com.elec5619.backend.services.GymApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/gymApplications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymApplicationController {

    private final GymApplicationService gymApplicationService;

    @GetMapping
    public ResponseEntity<List<GymApplicationResponseDto>> findAllGyms() {
        return ResponseEntity.ok(gymApplicationService.findAll());
    }

    @GetMapping("/{gymApplicationId}")
    public ResponseEntity<GymApplicationResponseDto> findOneGymApplicationById(@PathVariable UUID gymApplicationId) {
        return ResponseEntity.ok(gymApplicationService.findOneById(gymApplicationId));
    }


    @PostMapping
    public ResponseEntity<GymApplicationResponseDto> createGymApplication(@Valid @RequestBody GymApplicationRequestDto gymApplicationRequestDto) {
        return ResponseEntity.ok(gymApplicationService.create(gymApplicationRequestDto))
                ;
    }

    @PutMapping("/{gymApplicationId}")
    public ResponseEntity<GymApplicationResponseDto> updateGymStatus(@PathVariable UUID gymApplicationId, @RequestParam(name = "status") GymApplicationStatus gymApplicationStatus){
        return ResponseEntity.ok(gymApplicationService.updateStatus(gymApplicationId,gymApplicationStatus));
    }
}
