package com.example.GraduationBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private int notificationId;
    private String notificationMessage ;
    private Integer placeId ;
    private Integer userId ;
    private Integer ownerID ;
}
