package com.example.GraduationBackend.dto;

import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {

    private Integer bookingId ;
    private Integer userId ;
    private Integer placeId ;
    private String title ;
    private String category ;
    private String description ;
    private String bookingDate ;
    private String startDate ;
    private String endDate ;
    private Integer capacity ;
    private Double price ;
    private String status  ;
}
