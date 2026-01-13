package com.example.GraduationBackend.services;

import com.example.GraduationBackend.model.Notification;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;

    public void createNotification(Integer userId, Notification notification) {
         User user = userRepository.findById(userId).orElse(null);
         if (user == null) {
             throw new IllegalArgumentException("User not found");
         }
         List<Notification> notifications = user.getNotifications();
         notifications.add(notification);
         user.setNotifications(notifications);
    }

}
