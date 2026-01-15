package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.NotificationDTO;
import com.example.GraduationBackend.model.Notification;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.NotificationRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;


    public List<NotificationDTO> getAllNotificationsByPlaceId(Integer placeId) {
        List<Notification> notifications = notificationRepository.findByPlacePlaceId(placeId);
        List<NotificationDTO> notificationDTOS = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationDTO notificationDTO = new NotificationDTO();

            notificationDTO.setNotificationId(notification.getId());
            notificationDTO.setPlaceId(notification.getPlace().getPlaceId());
            notificationDTO.setNotificationMessage(notification.getMessage());
            notificationDTO.setOwnerID(notification.getPlaceOwner().getUserId());
            notificationDTO.setUserId(notification.getUserId());
            notificationDTOS.add(notificationDTO);
        }
        return notificationDTOS;
    }
    public List<NotificationDTO> getAllNotificationsByOwnerId(Integer ownerId) {
        User owner = userRepository.findById(ownerId).orElseThrow(
                () -> new RuntimeException("User with id "+ownerId+" not found")
        );
        List<Notification> notifications = notificationRepository.findByPlaceOwner(owner);
        List<NotificationDTO> notificationDTOS = new ArrayList<>();

        for (Notification notification : notifications) {
            NotificationDTO notificationDTO = new NotificationDTO();

            notificationDTO.setNotificationId(notification.getId());
            notificationDTO.setPlaceId(notification.getPlace().getPlaceId());
            notificationDTO.setNotificationMessage(notification.getMessage());
            notificationDTO.setOwnerID(notification.getPlaceOwner().getUserId());
            notificationDTO.setUserId(notification.getUserId());
            notificationDTOS.add(notificationDTO);
        }
        return notificationDTOS;
    }
    public List<NotificationDTO> getAllNotificationsByUserId(Integer userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        List<NotificationDTO> notificationDTOS = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationDTO notificationDTO = new NotificationDTO();

            notificationDTO.setNotificationId(notification.getId());
            notificationDTO.setPlaceId(notification.getPlace().getPlaceId());
            notificationDTO.setNotificationMessage(notification.getMessage());
            notificationDTO.setOwnerID(notification.getPlaceOwner().getUserId());
            notificationDTO.setUserId(notification.getUserId());
            notificationDTOS.add(notificationDTO);
        }
        return notificationDTOS;
    }

    @Transactional
    public void DeleteNotificationById(Integer notificationId){
        notificationRepository.deleteById(notificationId);
    }
    @Transactional
    public void deleteNotificationsByUserId(Integer userId){
        notificationRepository.deleteByUserId(userId);
    }
}
