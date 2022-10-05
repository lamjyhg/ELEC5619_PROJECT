package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.entities.AppointmentStatus;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.services.AppointmentService;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponseDto> createAppointment(@Valid @RequestBody AppointmentRequestDto appointmentRequestDto, HttpServletRequest request) throws AuthenticationError {
        HttpSession session = request.getSession();
        return ResponseEntity.ok(appointmentService.create(appointmentRequestDto,session));
    }

    @GetMapping("/listAllByGymOwner")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentsByGymOwner( HttpServletRequest request) throws AuthenticationError {
        HttpSession session = request.getSession();
        return ResponseEntity.ok(appointmentService.listAllForGymOwner(session));
    }

    @PutMapping("/{appointmentId}/cancelByGymOwner")
    public ResponseEntity<AppointmentResponseDto> cancelAppointmentByGymOwner(@PathVariable UUID appointmentId,
                                                                              @RequestParam(name = "comment") String comment,
                                                                              HttpServletRequest request) throws AuthenticationError, IOException {
        HttpSession session = request.getSession();
        return ResponseEntity.ok(appointmentService.cancelByGymOwner(appointmentId, comment,session));
    }
    
   @GetMapping("/listAllByUser")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentByUser(HttpSession session){
        return ResponseEntity.ok(appointmentService.listAppointmentByUser(session));
    }
    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentResponseDto> getAppointmentByUser(@PathVariable UUID appointmentId){
        return ResponseEntity.ok(appointmentService.findAppointmentById(appointmentId));
    }
//  ming  @PostMapping("")
//    public  ResponseEntity<AppointmentResponseDto> createAppointment(HttpSession session, @RequestBody AppointmentRequestDto appointmentInfo){
//        return ResponseEntity.ok(appointmentService.create(session,appointmentInfo));
//    }
    @PutMapping("/{appointmentId}")
    public  ResponseEntity<AppointmentResponseDto> updateAppointment(@PathVariable UUID appointmentId, @RequestBody AppointmentRequestDto appointmentInfo){
        return ResponseEntity.ok(appointmentService.update(appointmentId,appointmentInfo));
    }
}
