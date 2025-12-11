//package com.example.GraduationBackend.controller;
//
//import com.example.GraduationBackend.dto.request.ReviewRequest;
//import com.example.GraduationBackend.dto.response.ApiResponse;
//import com.example.GraduationBackend.model.Review;
//import com.example.GraduationBackend.services.ReviewService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/reviews")
//@RequiredArgsConstructor
//public class ReviewController {
//    private final ReviewService reviewService;
//
//    @PostMapping
//    public ResponseEntity<ApiResponse> postReview(@ModelAttribute ReviewRequest reviewRequest, @RequestParam Integer placeId, @RequestParam Integer userId) {
//        ReviewRequest review1 = reviewService.addReview(placeId, userId, reviewRequest);
//
//        return ResponseEntity.ok(new ApiResponse("Post review successful", review1));
//    }
//
//    @PutMapping
//    public ResponseEntity<ApiResponse> updateReview(@ModelAttribute ReviewRequest reviewRequest, @RequestParam Integer placeId, @RequestParam Integer userId) {
//        ReviewRequest reviewRequest1 = reviewService.updateReview(placeId, userId, reviewRequest);
//
//        return ResponseEntity.ok(new ApiResponse("Update review successful", reviewRequest1));
//    }
//
//    @DeleteMapping
//    public ResponseEntity<ApiResponse> deleteReview(@RequestParam Integer placeId, @RequestParam Integer userId) {
//        reviewService.deleteReview(placeId, userId);
//
//        return ResponseEntity.ok(new ApiResponse("Deletion Success !", "Review Deleted Successfully "));
//
//    }
//
//    @GetMapping("user/{userId}")
//    public ResponseEntity<ApiResponse> getReviewByUser(@PathVariable Integer userId) {
//        List<Review> userReviews = reviewService.getReviewsByUserId(userId);
//
//        return ResponseEntity.ok(new ApiResponse("User Reviews", userReviews));
//    }
//
//    @GetMapping("place/{userId}")
//    public ResponseEntity<ApiResponse> getReviewsByPlace(@PathVariable Integer userId) {
//        List<Review> userReviews = reviewService.getReviewsPlaceId(userId);
//
//        return ResponseEntity.ok(new ApiResponse("Place Reviews", userReviews));
//    }
//
//}