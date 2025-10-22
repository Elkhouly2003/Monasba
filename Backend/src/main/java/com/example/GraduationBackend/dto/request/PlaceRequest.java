package com.example.GraduationBackend.dto.request;


import com.example.GraduationBackend.model.Image;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PlaceRequest {
    private String placeName;
    private String address;
    private String city;
    private String country;
    private String phone;
    private String description;
    private Integer capacity;
    private LocalTime openTime;
    private LocalTime closeTime;
    private Double price;
    private Double discount;
    private List<String> categories ;
    private List<MultipartFile> images ;
}


