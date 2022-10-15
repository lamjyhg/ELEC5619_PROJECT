package com.elec5619.backend.services;


import com.elec5619.backend.dtos.GymResponseDto;
import com.elec5619.backend.dtos.ReviewRequest;
import com.elec5619.backend.dtos.ReviewResponse;
import com.elec5619.backend.entities.Gym;
import com.elec5619.backend.entities.Review;
import com.elec5619.backend.entities.User;
import com.elec5619.backend.mappers.ReviewMapper;
import com.elec5619.backend.repositories.GymRepository;
import com.elec5619.backend.repositories.ReviewRepository;
import com.elec5619.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final GymRepository gymRepository;
    private final UserRepository userRepository;




    public List<ReviewResponse> findAllByGymId(UUID gymId) {
        Optional<List<Review>> reviewList = reviewRepository.findAllByGid(gymId);
        return reviewList.get().stream().map(review -> reviewMapper.fromEntity(review)).collect(Collectors.toList());
    }


    public List<ReviewResponse> create(ReviewRequest request){
        Review review = reviewMapper.toEntity(request);
        UUID gym_id = request.getGid();
        UUID user_id = request.getUid();

        review.setRating(request.getStar());

        Gym gym = gymRepository.getReferenceById(gym_id);
        User user = userRepository.getReferenceById(user_id);

        if(user == null || gym == null){

            return null;
        }

        review.setUsername(user.getUsername());
        reviewRepository.save(review);


        Optional<List<Review>> reviewList = reviewRepository.findAllByGid(gym_id);
        return reviewList.get().stream().map(r -> reviewMapper.fromEntity(r)).collect(Collectors.toList());


    }
}


