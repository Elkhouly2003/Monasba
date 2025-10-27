package com.example.GraduationBackend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class BookingRequest {
    private Integer userId ;
    private Integer placeId ;
    private String title ;
    private String category ;
    private String Description ;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer capacity;
}
