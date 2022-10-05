package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.services.GymService;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.*;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/gyms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GymController {

    private final GymService gymService;

    @GetMapping
    public ResponseEntity<List<GymResponseDto>> findAllGyms(HttpSession session) throws IOException {
        return ResponseEntity.ok(gymService.findAll(session));
    }



    @GetMapping("/findAllNearby")
    public ResponseEntity<List<GymResponseDto>> findAllNearbyGyms(@RequestParam(name = "latitude") Double latitude,@RequestParam(name = "longitude") Double longitude, HttpSession session) throws IOException {

        System.out.println(session.getAttribute("token"));
        return ResponseEntity.ok(gymService.findAllNearby(latitude,longitude));
    }

    @GetMapping("/{gymId}")
    public ResponseEntity<GymResponseDto> findOneGymById(@PathVariable UUID gymId) {
        return ResponseEntity.ok(gymService.findOneById(gymId));
    }

    @PostMapping("")
    public ResponseEntity<GymResponseDto> createGym(@Valid @RequestBody GymRequestDto gymRequestDtoBody, HttpServletRequest request) throws AuthenticationError {

        HttpSession session = request.getSession();
        return ResponseEntity.ok(gymService.create(gymRequestDtoBody,session));
    }

    @PutMapping("/{gymId}")
    public ResponseEntity<GymResponseDto> updateGym(@PathVariable UUID gymId, @Valid @RequestBody GymRequestDto gymRequestDtoBody) {
        return ResponseEntity.ok(gymService.update(gymId, gymRequestDtoBody));
    }






}
