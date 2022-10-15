package com.elec5619.backend;


import com.elec5619.backend.dtos.GymApplicationResponseDto;
import com.elec5619.backend.dtos.GymRequestDto;
import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.exceptions.AuthenticationError;
import com.elec5619.backend.mappers.GymMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.services.GymService;
import com.elec5619.backend.services.UserService;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.servlet.http.HttpSession;
import java.util.*;


import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;



@SpringBootTest
public class TestGymService {


    @MockBean
    private UserRepository userRepository;
    @MockBean
    private GymRepository gymRepository;
    @Autowired
    private GymService gymService;
    @MockBean
    private UserService userService;
    @MockBean
    private GymRequestDto gymRequestDto;
    @MockBean
    private GymMapper gymMapper;




    @Mock
    GymApplicationResponseDto gymApplicationResponseDto;
    @Mock
    HttpSession session;
    @Mock
    User user1;
    @Mock
    Gym gym1;
    @Mock
    Gym gym2;
    @Mock
    Gym gym3;


    UUID id1 = UUID.randomUUID();
    UUID id2 = UUID.randomUUID();

    List<Gym> gymList;


    @BeforeEach
    void setUp(){
        gymList = new ArrayList<>();
        gymList.add(gym1);
        gymList.add(gym2);
        gymList.add(gym3);


        when(gym1.getId()).thenReturn(id1);
        when(gym2.getId()).thenReturn(id2);

    }

    @Test
    public void testGetAll(){

        when(gymRepository.findAll()).thenReturn(gymList);

        List<GymResponseDto> responses = gymService.findAll();

        assertNotNull(responses);
        assertEquals(3, responses.size());


    }


    @Test
    public void testNearByAllNegative(){
        Double a = -102.3;
        Double b = -88.38;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }



    @Test
    public void testNearByAllPos(){
        Double a = 102.3;
        Double b = 88.38;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }



    @Test
    public void testNearByRandom1(){
        Double a = 102.3;
        Double b = -88.38;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }



    @Test
    public void testNearByRandom2(){
        Double a = -102.3;
        Double b = 88.38;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }


    @Test
    public void testNearByLarge(){
        Double a = 999999.99;
        Double b = 999999.99;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }



    @Test
    public void testNearBySmall(){
        Double a = -999999.99;
        Double b = -999999.99;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }


    @Test
    public void testNearByZero(){
        Double a = 0.0;
        Double b = 0.0;

        List<Gym> testList = new ArrayList<>();
        testList.add(gym1);

        when(gymRepository.findNearbyGymsByCurrentLocation(a, b)).thenReturn(testList);

        List<Gym> res = gymRepository.findNearbyGymsByCurrentLocation(a,b);

        assertNotNull(res);

        assertEquals(1, res.size());
    }


    @Test
    public void testFindById(){

        when(gymRepository.findById(gym1.getId())).thenReturn(Optional.ofNullable(gym1));

        Optional<Gym> gymResponseDto = gymRepository.findById(gym1.getId());

        assertTrue(gymResponseDto.isPresent());

        Gym gym = gymResponseDto.get();

        assertEquals(id1, gym.getId());

    }


    @Test
    public void testFindByIdNotExist(){

        when(gymRepository.findById(gym2.getId())).thenReturn(Optional.empty());

        Optional<Gym> gymResponseDto = gymRepository.findById(gym2.getId());

        assertNotNull(gymResponseDto);

        assertFalse(gymResponseDto.isPresent());
    }


    @Test
    public void testCreate() throws AuthenticationError {

        Map<String, Double> map = new HashMap<>();

        map.put("geo",1.2);

        when(gymRepository.save(any())).thenReturn(gym1);
        when(userService.getUserByToken(any())).thenReturn(user1);
        when(gymMapper.toEntity(any())).thenReturn(gym1);
        when(gymRequestDto.getDescription()).thenReturn("a");
        when(gymRequestDto.getName()).thenReturn("n");
        when(gymRequestDto.getImageUrl()).thenReturn("./images/a.jpg");
        when(gymRequestDto.getMaximumOfAppointments()).thenReturn(1);
        when(gymRequestDto.getGeoLocation()).thenReturn(map);
        when(gymMapper.fromEntityAppRes(any())).thenReturn(gymApplicationResponseDto);
        when(gymApplicationResponseDto.getId()).thenReturn(id1);

        GymApplicationResponseDto gymApplicationResponseDto1 = gymService.create(gymRequestDto, session);

        assertNotNull(gymApplicationResponseDto);
        assertEquals(id1, gymApplicationResponseDto1.getId());
    }

}
