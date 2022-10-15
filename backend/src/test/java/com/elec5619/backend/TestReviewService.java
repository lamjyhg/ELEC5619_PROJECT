package com.elec5619.backend;


import com.elec5619.backend.dtos.ReviewRequest;
import com.elec5619.backend.dtos.ReviewResponse;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.Review;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.mappers.ReviewMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.ReviewRepository;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.services.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.junit.Assert.*;

@SpringBootTest
public class TestReviewService {


    @Autowired
    ReviewService reviewService;

    @MockBean
    private ReviewRepository reviewRepository;
    @MockBean
    private ReviewMapper reviewMapper;
    @MockBean
    private GymRepository gymRepository;
    @MockBean
    private UserRepository userRepository;


    @Mock
    ReviewRequest reviewRequest;

    @Mock
    Review review1;
    @Mock
    Review review2;
    @Mock
    Review review3;
    @Mock
    Review review4;
    @Mock
    Gym gym1;
    @Mock
    User user1;


    List<Review> reviewList;

    @BeforeEach
    void setUp(){
        reviewList = new ArrayList<>();
        reviewList.add(review1);
        reviewList.add(review2);
        reviewList.add(review3);
        reviewList.add(review4);
    }



    @Test
    public void testGetAll(){



        when(reviewRepository.findAllByGid(any())).thenReturn(Optional.ofNullable(reviewList));

        Optional<List<Review>> reviewListOptional = reviewRepository.findAllByGid(UUID.randomUUID());

        assertNotNull(reviewList);
        assertTrue(reviewListOptional.isPresent());

        List<Review> reviews = reviewListOptional.get();
        assertEquals(4, reviews.size());

    }


    @Test
    public void testCreate(){

        doReturn(review1).when(reviewRepository).save(null);

        when(reviewMapper.toEntity(any())).thenReturn(review1);
        UUID id1 = UUID.randomUUID();
        UUID gid = UUID.randomUUID();
        UUID uid = UUID.randomUUID();


        when(review1.getId()).thenReturn(id1);
        when(reviewRequest.getUid()).thenReturn(uid);
        when(reviewRequest.getGid()).thenReturn(gid);
        when(reviewRequest.getStar()).thenReturn(1);
        when(reviewRequest.getComment()).thenReturn("x");
        when(reviewRequest.getDate()).thenReturn("2022/10/10");
        when(reviewRepository.findAllByGid(gid)).thenReturn(Optional.ofNullable(reviewList));
        when(gymRepository.getReferenceById(gid)).thenReturn(gym1);
        when(userRepository.getReferenceById(uid)).thenReturn(user1);


        List<ReviewResponse> responses = reviewService.create(reviewRequest);
        assertNotNull(responses);
        assertEquals(4, reviewList.size());
    }

    @Test
    public void testCreateInvalidUid(){
        doReturn(review1).when(reviewRepository).save(null);

        when(reviewMapper.toEntity(any())).thenReturn(review1);
        UUID id1 = UUID.randomUUID();
        UUID gid = UUID.randomUUID();
        UUID uid = UUID.randomUUID();



        when(review1.getId()).thenReturn(id1);
        when(reviewRequest.getUid()).thenReturn(uid);
        when(reviewRequest.getGid()).thenReturn(gid);
        when(reviewRequest.getStar()).thenReturn(1);
        when(reviewRequest.getComment()).thenReturn("x");
        when(reviewRequest.getDate()).thenReturn("2022/10/10");
        when(reviewRepository.findAllByGid(gid)).thenReturn(Optional.ofNullable(reviewList));
        when(gymRepository.getReferenceById(gid)).thenReturn(gym1);
        when(userRepository.getReferenceById(uid)).thenReturn(null);

        List<ReviewResponse> responses = reviewService.create(reviewRequest);
        assertNull(responses);
    }





    @Test
    public void testCreateInvalidGid(){
        doReturn(review1).when(reviewRepository).save(null);

        when(reviewMapper.toEntity(any())).thenReturn(review1);
        UUID id1 = UUID.randomUUID();
        UUID gid = UUID.randomUUID();
        UUID uid = UUID.randomUUID();



        when(review1.getId()).thenReturn(id1);
        when(reviewRequest.getUid()).thenReturn(uid);
        when(reviewRequest.getGid()).thenReturn(gid);
        when(reviewRequest.getStar()).thenReturn(1);
        when(reviewRequest.getComment()).thenReturn("x");
        when(reviewRequest.getDate()).thenReturn("2022/10/10");
        when(reviewRepository.findAllByGid(gid)).thenReturn(Optional.ofNullable(reviewList));
        when(gymRepository.getReferenceById(gid)).thenReturn(null);
        when(userRepository.getReferenceById(uid)).thenReturn(user1);

        List<ReviewResponse> responses = reviewService.create(reviewRequest);
        assertNull(responses);
    }
}
