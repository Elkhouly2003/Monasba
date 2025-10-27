package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.request.ReviewRequest;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.Review;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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

    public List<Review> getReviewsByUserId(Integer userId) {
        User user = userService.getUserById(userId);
        return reviewRepository.findReviewsByUser(user);
    }

    public List<Review> getReviewsPlaceId(Integer placeId) {
        User user = userService.getUserById(placeId);
        return reviewRepository.findReviewsByUser(user);
    }

}
