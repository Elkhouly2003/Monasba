package com.example.GraduationBackend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReviewRequest {
    private String comment;
    private Double ratings;
}
