package com.elec5619.backend.mappers;


import com.elec5619.backend.dtos.ReviewRequest;
import com.elec5619.backend.dtos.ReviewResponse;
import com.elec5619.backend.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {


    Review toEntity(ReviewRequest review);
    ReviewResponse fromEntity(Review review);

}
