package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.ReviewDTO;
import com.example.GraduationBackend.dto.request.ReviewRequest;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.Review;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PlaceService placeService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ReviewRequest addReview(Integer placeId, Integer userId, ReviewRequest reviewRequest) {
        Place place = placeService.getPlaceById(placeId);
        User user = userService.getUserById(userId);

        Review review = modelMapper.map(reviewRequest, Review.class);

        Optional<Review> existingReview = reviewRepository.findByUserAndPlace(user, place);
        if (existingReview.isPresent()) {
            throw new IllegalArgumentException("User has already reviewed this place");
        }

        review.setPlace(place);
        review.setUser(user);

        reviewRepository.save(review);

        return reviewRequest;
    }
    public ReviewDTO getReviewById  (Integer reviewId) {
        Review review = reviewRepository.findById(reviewId.longValue()).orElseThrow(
                () -> new IllegalArgumentException("Review with id "+reviewId+" not found")
        );
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setReviewId(review.getId());
        reviewDTO.setPlaceId(review.getPlace().getPlaceId());
        reviewDTO.setUserId(review.getUser().getUserId());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setRatings(review.getRatings());

        return reviewDTO;
    }

    public ReviewRequest updateReview(Integer placeId, Integer userId, ReviewRequest reviewRequest) {
        Place place = placeService.getPlaceById(placeId);
        User user = userService.getUserById(userId);

        Optional<Review> review = reviewRepository.findByUserAndPlace(user, place);

        review.ifPresent(r -> {
            Optional.ofNullable(reviewRequest.getRatings()).ifPresent(r::setRatings);
            Optional.ofNullable(reviewRequest.getComment()).ifPresent(r::setComment);
            reviewRepository.save(r);

        });
        return reviewRequest;
    }

    public void deleteReview(Integer placeId, Integer userId) {
        Place place = placeService.getPlaceById(placeId);
        User user = userService.getUserById(userId);

        Optional<Review> review = reviewRepository.findByUserAndPlace(user, place);

        review.ifPresent(reviewRepository::delete);
    }

    public List<ReviewDTO> getReviewsByUserId(Integer userId) {
        User user = userService.getUserById(userId);
        List<Review> reviews = reviewRepository.findReviewsByUser(user);
        List<ReviewDTO> reviewsDto = new ArrayList<>() ;

        for(Review review : reviews) {
            ReviewDTO dto = new ReviewDTO();
            dto.setComment( review.getComment() );
            dto.setRatings(review.getRatings());
            dto.setPlaceId(review.getPlace().getPlaceId());
            dto.setUserId(review.getUser().getUserId());
            dto.setReviewId(review.getId());
            reviewsDto.add(dto);
        }
        return  reviewsDto ;

    }

    public List<ReviewDTO> getReviewsPlaceId(Integer placeId) {
        Place place = placeService.getPlaceById(placeId);
        List<Review> reviews = reviewRepository.findReviewsByPlace(place);

        List<ReviewDTO> reviewsDto = new ArrayList<>() ;

        for(Review review : reviews) {
            ReviewDTO dto = new ReviewDTO();
            dto.setComment( review.getComment() );
            dto.setRatings(review.getRatings());
            dto.setPlaceId(review.getPlace().getPlaceId());
            dto.setUserId(review.getUser().getUserId());
            dto.setReviewId(review.getId());
            reviewsDto.add(dto);
        }
        return  reviewsDto ;


    }
    public List<ReviewDTO> getReviewsOwnerId(Integer ownerId) {
         List<Review> reviews = reviewRepository.findAllReviewsByOwnerId(ownerId);
         List<ReviewDTO> reviewsDto = new ArrayList<>() ;
         for(Review review : reviews) {
             ReviewDTO dto = new ReviewDTO();
             dto.setPlaceId(review.getPlace().getPlaceId());
             dto.setUserId(review.getUser().getUserId());
             dto.setReviewId(review.getId());
             dto.setComment( review.getComment() );
             dto.setRatings(review.getRatings());

             reviewsDto.add(dto);
         }
         return  reviewsDto ;
    }

}
