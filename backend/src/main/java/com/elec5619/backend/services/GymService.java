
package com.elec5619.backend.services;

import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.entities.gymEnums.GymApplicationStatus;
import com.elec5619.backend.entities.gymEnums.GymApplicationType;
import com.elec5619.backend.entities.gymEnums.GymStatus;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.jwt.JwtTokenUtil;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.AppointmentRepository;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.utils.DateHandlers;
import com.elec5619.backend.utils.FileUploadUtil;
import com.elec5619.backend.entities.gymEnums.GymApplicationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.naming.AuthenticationException;
import javax.servlet.http.HttpSession;
import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GymService {
    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final GymMapper gymMapper;
    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    private final AppointmentRepository appointmentRepository;

    private final AppointmentService appointmentService;

    public List<GymResponseDto> findAll() {
        List<Gym> gymList = gymRepository.findAll();

        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }


    public List<GymResponseDto> findAllNearby(Double latitude,Double longitude) {
        List<Gym> gymList = gymRepository.findNearbyGymsByCurrentLocation(latitude,longitude);

        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }

    public GymResponseDto findOneById(UUID id) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        return gymMapper.fromEntity(foundGym);
    }
    public GymApplicationResponseDto create(GymRequestDto gymRequestDto, HttpSession session) throws AuthenticationError {
        User user = userService.getUserByToken(session);
        Gym gym = gymMapper.toEntity(gymRequestDto);
        gym.setOwner(user);
        gym.setGymApplicationType(GymApplicationType.CREATE);
        user.addGyms(gym);
        userRepository.save(user);
        Gym savedGym = gymRepository.save(gym);
        return gymMapper.fromEntityAppRes(savedGym);
    }
    public String savePhoto(HttpSession session, MultipartFile imageFile) throws AuthenticationError {
        User user = userService.getUserByToken(session);
        String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
        UUID uuid =  UUID.randomUUID();
        String uploadDir = "gym-photos/" + uuid.toString();
        try {
            FileUploadUtil.saveFile(uploadDir, fileName, imageFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String imageUrl = uploadDir + "/" +fileName;
        return imageUrl;
    }

    public GymApplicationResponseDto update(UUID id, GymRequestDto gymRequestDto) {
        Gym foundGym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));

        foundGym.setName(gymRequestDto.getName());
        foundGym.setAddress(gymRequestDto.getAddress());
        foundGym.setDescription(gymRequestDto.getDescription());
        foundGym.setGeoLocation(gymRequestDto.getGeoLocation());
        foundGym.setImageUrl(gymRequestDto.getImageUrl());
        foundGym.setMaximumOfAppointments(gymRequestDto.getMaximumOfAppointments());
        foundGym.setTradingHours(gymRequestDto.getTradingHours());
        foundGym.setLastUpdatedTime(new Date());
        foundGym.setGymStatus(GymStatus.PRIVATE);
        if(!foundGym.getGymApplicationStatus().equals(GymApplicationType.CREATE)){
            foundGym.setGymApplicationType(GymApplicationType.UPDATE);
        }
        foundGym.setGymApplicationStatus(GymApplicationStatus.PENDING);

        gymRepository.save(foundGym);
        return gymMapper.fromEntityAppRes(foundGym);
    }

    public List<GymApplicationResponseDto> findAllOwnerGyms(HttpSession session) throws AuthenticationError {
        User user = userService.getUserByToken(session);
        List<Gym> gymList = gymRepository.findAllByOwnerId(user.getId());
        return gymList.stream().map(gym -> gymMapper.fromEntityAppRes(gym)).collect(Collectors.toList());
    }

    public List<GymApplicationResponseDto> getAllRequest() {
        List<Gym> gymList = gymRepository.getPendingGymRequests();
        return gymList.stream().map(gym -> gymMapper.fromEntityAppRes(gym)).collect(Collectors.toList());
    }

    public Gym approveApplication(UUID id){
        Gym gym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        gym.setGymApplicationStatus(GymApplicationStatus.APPROVED);
        gym.setGymStatus(GymStatus.PUBLIC);
        Gym savedGym = gymRepository.save(gym);
        return savedGym;
    }
    public Gym disapproveApplication(UUID id){
        Gym gym = gymRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s", id)));
        gym.setGymApplicationStatus(GymApplicationStatus.DISAPPROVED);
        Gym savedGym = gymRepository.save(gym);
        return savedGym;
    }

    public List<GymResponseDto> findAllBySearchWord(String searchWord) {
        List<Gym> gymList = gymRepository.findAllGymBySearchWord("%"+searchWord+"%");
        System.out.println("searchWord is ");
        System.out.println(searchWord);
        System.out.println("-------------------------------");
        for (Gym g : gymList) {
            System.out.println("Gym" + g.getName());
        }
        System.out.println("-------------------------------");
        return gymList.stream().map(gym -> gymMapper.fromEntity(gym)).collect(Collectors.toList());
    }



    public ResponseEntity getTimeAvailability(UUID gymId, LocalDateTime appointmentStartTime, LocalDateTime appointmentEndTime){
        Gym foundGym = gymRepository.findById(gymId).orElseThrow(() -> new IllegalArgumentException(String.format("Unknown id %s")));
        Integer availability = appointmentService.getAvailabilityByGymIdAndStartTimeAndEndTime(foundGym,appointmentStartTime,appointmentEndTime);
        Map<String, Object> response = new HashMap<String, Object>();
        if(availability<=0){
            availability = 0;
        }
        response.put("availability", availability);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }



}
