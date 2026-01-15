package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.NotificationDTO;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notificationss")
@RequiredArgsConstructor
public class NotificationController {
  private final NotificationService notificationService;

  @GetMapping("place/{placeId}")
  public ResponseEntity<ApiResponse> getNotificationsByPlaceId(@PathVariable Integer placeId) {
      List<NotificationDTO> notifications = notificationService.getAllNotificationsByPlaceId(placeId);
      return ResponseEntity.ok(new ApiResponse("Success !",  notifications));
  }
    @GetMapping("owner/{ownerId}")
    public ResponseEntity<ApiResponse> getNotificationsByOwnerId(@PathVariable Integer ownerId) {
        List<NotificationDTO> notifications = notificationService.getAllNotificationsByOwnerId(ownerId);
        return ResponseEntity.ok(new ApiResponse("Success !",  notifications));
    }
    @GetMapping("user/{userId}")
    public ResponseEntity<ApiResponse> getNotificationsByUserId(@PathVariable Integer userId) {
        List<NotificationDTO> notifications = notificationService.getAllNotificationsByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Success !",  notifications));
    }
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ApiResponse>deleteNotificationById(@PathVariable Integer notificationId) {
      notificationService.DeleteNotificationById(notificationId);
      return ResponseEntity.ok(new ApiResponse("Success !",  "Notification deleted successfully"));
    }

    @DeleteMapping("user/{userId}")
    public ResponseEntity<ApiResponse> deleteNotificationsByUserId(@PathVariable Integer userId) {
        notificationService.deleteNotificationsByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Success !",  "Notifications deleted successfully"));
    }


}
