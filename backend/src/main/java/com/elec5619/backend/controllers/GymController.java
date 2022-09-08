package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.GymGetDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.services.GymService;
import com.elec5619.backend.dtos.GymPostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/gyms")
@RequiredArgsConstructor
public class GymController {

    private final GymService gymService;

    @GetMapping
    public ResponseEntity<List<GymGetDto>> findAllGyms() {
        return ResponseEntity.ok(gymService.listAll());
    }

    @PostMapping
    public ResponseEntity<GymGetDto> addOneGym(@RequestBody GymPostDto gymPostDto) {
        System.out.println(String.format("name : %s", gymPostDto.getName()));
        System.out.println(String.format("address : %s", gymPostDto.getAddress()));
        System.out.println(String.format("id : %s", gymPostDto.getUserId()));
        System.out.println(String.format("image : %s", gymPostDto.getImageUrl()));
        System.out.println(String.format("number of appointments : %d", gymPostDto.getMaximumOfAppointments()));
        System.out.println(String.format("hours : %s", gymPostDto.getTradingHours().toString()));
        System.out.println(String.format("geolocation : %s", gymPostDto.getGeoLocation().toString()));

        return "aaa";
    }


}
