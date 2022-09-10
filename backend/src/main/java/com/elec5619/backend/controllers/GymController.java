package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.services.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/gyms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {

    private final GymService gymService;

    @GetMapping
    public ResponseEntity<List<GymResponseDto>> findAllGyms() {
        return ResponseEntity.ok(gymService.findAll());
    }

    @GetMapping("/{gymId}")
    public ResponseEntity<GymResponseDto> findOneGymById(@PathVariable UUID gymId) {
        return ResponseEntity.ok(gymService.findOneById(gymId));
    }

    @PostMapping("")
    public ResponseEntity<GymResponseDto> createGym(@Valid @RequestBody GymRequestDto gymRequestDtoBody) {
//        System.out.println(String.format("name : %s", gymPostDto.getName()));
//        System.out.println(String.format("address : %s", gymPostDto.getAddress()));
//        System.out.println(String.format("id : %s", gymPostDto.getUserId()));
//        System.out.println(String.format("image : %s", gymPostDto.getImageUrl()));
//        System.out.println(String.format("number of appointments : %d", gymPostDto.getMaximumOfAppointments()));
//        System.out.println(String.format("hours : %s", gymPostDto.getTradingHours().toString()));
//        System.out.println(String.format("geolocation : %s", gymPostDto.getGeoLocation().toString()));
//
//        return "aaa";
        return ResponseEntity.ok(gymService.create(gymRequestDtoBody));
    }

    @PutMapping("/{gymId}")
    public ResponseEntity<GymResponseDto> updateGym(@PathVariable UUID gymId, @Valid @RequestBody GymRequestDto gymRequestDtoBody) {
        return ResponseEntity.ok(gymService.update(gymId, gymRequestDtoBody));
    }


}
