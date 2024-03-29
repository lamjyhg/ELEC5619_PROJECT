package com.elec5619.backend.controllers;

import com.elec5619.backend.dtos.*;
import com.elec5619.backend.exceptions.AuthenticationError;

import com.elec5619.backend.entities.Review;

import com.elec5619.backend.services.GymService;
import com.elec5619.backend.services.ReviewService;
import com.elec5619.backend.utils.EmailSendingHandler;
import com.elec5619.backend.utils.EmailSendingHanlderImple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import javax.annotation.security.RolesAllowed;
import javax.validation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/gyms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class  GymController {

    private final GymService gymService;
    private final ReviewService reviewService;


    @GetMapping("/{gymId}/reviews")
    public ResponseEntity<List<ReviewResponse>> finalAllReviewByGymId(@PathVariable(name = "gymId")UUID gymId) throws IOException {

        List<ReviewResponse> x = reviewService.findAllByGymId(gymId);
        return ResponseEntity.ok(x);
    }


    @PostMapping("/{gymId}/create_review")
    public List<ReviewResponse> createReview( @RequestBody ReviewRequest request) throws IOException {
        List<ReviewResponse> review = reviewService.create(request);
        return review;
    }

    @GetMapping("")
    public ResponseEntity<List<GymResponseDto>> findAllGyms(@RequestParam(name = "searchWord", required = false) String searchWord) throws IOException {
        if(searchWord!= null){
            System.out.println("searchword is " + searchWord);
            return ResponseEntity.ok(gymService.findAllBySearchWord(searchWord));
        }else{
            System.out.println("NULL searchword");
            return ResponseEntity.ok(gymService.findAll());
        }
    }



    @GetMapping("/findAllNearby")
    public ResponseEntity<List<GymResponseDto>> findAllNearbyGyms(@RequestParam(name = "latitude") Double latitude,@RequestParam(name = "longitude") Double longitude) throws IOException {

        return ResponseEntity.ok(gymService.findAllNearby(latitude,longitude));
    }

    @GetMapping("/{gymId}")
    public ResponseEntity<GymResponseDto> findOneGymById(@PathVariable UUID gymId) {
        return ResponseEntity.ok(gymService.findOneById(gymId));
    }
    @PostMapping(value ="")
    public ResponseEntity<GymApplicationResponseDto> createGym(@Valid @RequestBody GymRequestDto gymRequestDtoBody, HttpServletRequest request) throws AuthenticationError {
        HttpSession session = request.getSession();
        return ResponseEntity.ok(gymService.create(gymRequestDtoBody, session));
    }
    @PostMapping(value ="/gym-photos",consumes = "multipart/form-data")
    public ResponseEntity uploadImage(HttpServletRequest request ,@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) throws AuthenticationError {
        System.out.println("hk");
//        System.out.println(gymRequestDtoBody);
        System.out.println(request);
        System.out.println(imageFile);
        HttpSession session = request.getSession();
        return ResponseEntity.ok(gymService.savePhoto(session, imageFile));
    }


    @PutMapping("/{gymId}")
    public ResponseEntity<GymApplicationResponseDto> updateGym(@PathVariable UUID gymId, @Valid @RequestBody GymRequestDto gymRequestDtoBody) {
        return ResponseEntity.ok(gymService.update(gymId, gymRequestDtoBody));
    }

    @GetMapping("/getAllRequest")
    public ResponseEntity getAllRequest() {
        return ResponseEntity.ok(gymService.getAllRequest());
        //return ResponseEntity.ok("ok");
    }
    
    @GetMapping("/gymOwner")
    public ResponseEntity<List<GymApplicationResponseDto>> findOwnerGyms(HttpServletRequest request) throws AuthenticationError{
        HttpSession session = request.getSession();
        return ResponseEntity.ok(gymService.findAllOwnerGyms(session));
    }


    @PostMapping("/application/{gym_id}/approve")
    public ResponseEntity approveApplication(@PathVariable(name = "gym_id")UUID gym_id) {
        return ResponseEntity.ok(gymService.approveApplication(gym_id));
    }

    @PostMapping("/application/{gym_id}/disapprove")
    public ResponseEntity disapproveApplication(@PathVariable(name = "gym_id")UUID gym_id) {
        return ResponseEntity.ok(gymService.disapproveApplication(gym_id));
    }

    @PostMapping("/{gymId}/getAvailability")
    public ResponseEntity getAvailability(@PathVariable UUID gymId,
                                           @Valid @RequestBody TimeAvailabilityRequestDto body)  {

        return ResponseEntity.ok(gymService.getTimeAvailability(gymId,body.getStartTime(), body.getEndTime()));
    }

}
