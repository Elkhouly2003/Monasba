package com.example.GraduationBackend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {
    private Integer userId;
    private String name;
    private String email;
    private String role;
    private Boolean isAccountVerified;

}
