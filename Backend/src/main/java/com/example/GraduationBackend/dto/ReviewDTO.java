package com.example.GraduationBackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Integer ReviewId;
    private String comment;
    private Double ratings;
    private Integer userId ;
    private Integer placeId ;
}