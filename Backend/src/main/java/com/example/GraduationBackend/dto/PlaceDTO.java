package com.example.GraduationBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDTO {
    private Integer ownerID ;
    private String placeName;
    private String address;
    private String city;
    private String country;
    private String phone;
    private String description;
    private String shortDescription;
    private Integer capacity;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Double price;
    private Double discount;
    private List<String> categories ;
    private List<Integer> imagesID ;
    private List<Integer> reviewsId ;
}
