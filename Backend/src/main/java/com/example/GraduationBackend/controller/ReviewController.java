package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.ReviewDTO;
import com.example.GraduationBackend.dto.request.ReviewRequest;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Review;
import com.example.GraduationBackend.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse> postReview(@ModelAttribute ReviewRequest reviewRequest, @RequestParam Integer placeId, @RequestParam Integer userId) {
        ReviewRequest review1 = reviewService.addReview(placeId, userId, reviewRequest);

        return ResponseEntity.ok(new ApiResponse("Post review successful", review1));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateReview(@ModelAttribute ReviewRequest reviewRequest, @RequestParam Integer placeId, @RequestParam Integer userId) {
        ReviewRequest reviewRequest1 = reviewService.updateReview(placeId, userId, reviewRequest);

        return ResponseEntity.ok(new ApiResponse("Update review successful", reviewRequest1));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteReview(@RequestParam Integer placeId, @RequestParam Integer userId) {
        reviewService.deleteReview(placeId, userId);

        return ResponseEntity.ok(new ApiResponse("Deletion Success !", "Review Deleted Successfully "));
    }
    @GetMapping("{reviewId}")
    public ResponseEntity<ApiResponse> getReviewById(@PathVariable int reviewId){
        ReviewDTO reviewDTO = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok(new ApiResponse("Get review successful", reviewDTO));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<ApiResponse> getReviewByUser(@PathVariable Integer userId) {
        List<ReviewDTO> userReviews = reviewService.getReviewsByUserId(userId);

        return ResponseEntity.ok(new ApiResponse("User Reviews", userReviews));
    }

    @GetMapping("place/{placeId}")
    public ResponseEntity<ApiResponse> getReviewsByPlace(@PathVariable Integer placeId) {
        List<ReviewDTO> userReviews = reviewService.getReviewsPlaceId(placeId);

        return ResponseEntity.ok(new ApiResponse("Place Reviews", userReviews));
    }
    @GetMapping("owner/{ownerId}")
    public ResponseEntity<ApiResponse> getReviewsByOwnerId(@PathVariable Integer ownerId) {
        List<ReviewDTO> reviewDTOS = reviewService.getReviewsOwnerId(ownerId);
        return ResponseEntity.ok(new ApiResponse("Owner Reviews", reviewDTOS));
    }

}