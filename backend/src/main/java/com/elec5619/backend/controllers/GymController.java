package com.elec5619.backend.controllers;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.services.GymService;
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
    List<Gym> findAllGyms() {
        List<Gym> gymList = gymService.listAll();
        return gymList;
    }



}
