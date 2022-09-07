package com.elec5619.backend.controllers;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.services.GymService;
import com.elec5619.backend.utils.GymApplicationForm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path="/gyms")
@RequiredArgsConstructor
public class GymController {

    private final GymService gymService ;

    @GetMapping
    public Iterable<Gym> findAllGyms() {
        List<Gym> gymList = gymService.listAll();
        return gymList;
    }

    @PostMapping
    public String addOneGym(@RequestBody GymApplicationForm gymApplicationForm) {
        //System.out.println(String.format("name: %s \n address: %s \n  %s %s %s %s %s",gymApplicationForm.getName(),gymApplicationForm.getAddress(),gymApplicationForm.getGeoLocation(),gymApplicationForm.getImageUrl(),gymApplicationForm.getMaximumAppointments(),gymApplicationForm.getTradingHours()));
        return "aaa";
    }




}
