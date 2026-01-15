package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.Notification;
import com.example.GraduationBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByPlacePlaceId(Integer placeId);
    List<Notification> findByPlaceOwner(User owner);
    List<Notification> findByUserId(Integer userId);
    void deleteByUserId(Integer userId);
}
