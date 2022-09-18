package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.entities.GymApplicationStatus;
import com.elec5619.backend.services.AppointmentService;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {
    private final AppointmentService appointmentService;


    @GetMapping("/listAllByGymOwner")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentsByGymOwner() {
        return ResponseEntity.ok(appointmentService.listAllForGymOwner());
    }

    @PutMapping("/{appointmentId}/cancelledByGymOwner")
    public ResponseEntity<AppointmentResponseDto> cancelAppointmentByGymOwner(@PathVariable UUID appointmentId, @RequestParam(name = "comment") String comment) throws IOException {
        return ResponseEntity.ok(appointmentService.cancelByGymOwner(appointmentId, comment));
    }

}
