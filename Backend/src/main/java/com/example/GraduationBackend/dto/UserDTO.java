package com.example.GraduationBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private String name;
    private String email;
    private String Phone ;
    List<Integer> placesIds = new ArrayList<>();
    List<Integer> reviewIds = new ArrayList<>();
    List<Integer> notificationsIds = new ArrayList<>() ;

}
