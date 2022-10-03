package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.AppointmentRequestDto;
import com.elec5619.backend.dtos.AppointmentResponseDto;
import com.elec5619.backend.services.AppointmentService;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static jdk.nashorn.internal.objects.Global.print;

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
    
   @GetMapping("/listAllByUser")
    public ResponseEntity<List<AppointmentResponseDto>> getAppointmentByUser(HttpSession session){
        return ResponseEntity.ok(appointmentService.listAppointmentByUser(session));
    }
    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentResponseDto> getAppointmentByUser(@PathVariable UUID appointmentId){
        return ResponseEntity.ok(appointmentService.findAppointmentById(appointmentId));
    }
    @PostMapping("")
    public  ResponseEntity<AppointmentResponseDto> createAppointment(HttpSession session, @RequestBody AppointmentRequestDto appointmentInfo){
        return ResponseEntity.ok(appointmentService.create(session,appointmentInfo));
    }
    @PutMapping("/{appointmentId}")
    public  ResponseEntity<AppointmentResponseDto> updateAppointment(@PathVariable UUID appointmentId, @RequestBody AppointmentRequestDto appointmentInfo){
        return ResponseEntity.ok(appointmentService.update(appointmentId,appointmentInfo));
    }
}
