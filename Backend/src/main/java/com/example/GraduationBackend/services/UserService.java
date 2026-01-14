package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.PlaceDTO;
import com.example.GraduationBackend.dto.ReviewDTO;
import com.example.GraduationBackend.dto.UserDTO;
import com.example.GraduationBackend.model.Notification;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.Review;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.NotificationRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;


    private final NotificationRepository notificationRepository;

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User With id " + userId + " not found")
        );
    }

    public UserDTO getUserDtoById(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }
        // for test notification
//        Notification notification1 = new Notification();
//        notification1.setAction("Place is pocked");
//        notification1.setMessage("Good Customer");
//
//        notificationRepository.save(notification1);
//
//        List<Notification> notificationsList = user.getNotifications();
//        notificationsList.add(notification1);
//        user.setNotifications(notificationsList);

        UserDTO userDTO = new UserDTO();

        userDTO.setId(userId);
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setPhone(user.getPhone());

        List<Review> reviews = user.getReviews();
        List<Integer> reviewIDs = new ArrayList<>() ;

        for (Review review : reviews) {
          reviewIDs.add(review.getId());
        }
        userDTO.setReviewIds(reviewIDs);

        List<Place> places = user.getMyPlaces();
        List<Integer> placesIds = new ArrayList<>() ;

        for (Place place : places) {
             placesIds.add(place.getPlaceId());
        }
        userDTO.setPlacesIds(placesIds);

        List<Notification> notifications = user.getNotifications();

        List<Integer> notificationIDs = new ArrayList<>() ;
        for (Notification notification : notifications) {
            notificationIDs.add(notification.getId());
        }
        userDTO.setNotificationsIds(notificationIDs);
        return userDTO;
    }

    public void savePlaceForUser(Integer userId, Integer placeId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Place not found"));


        if (!user.getSavedPlaces().contains(place)) {
            user.getSavedPlaces().add(place);
        }

        userRepository.save(user);
    }



}
