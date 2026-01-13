package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.Review;
import com.example.GraduationBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByUserAndPlace(User user, Place place);

    List<Review> findReviewsByUser(User user);
    List<Review> findReviewsByPlace(Place place);
}
