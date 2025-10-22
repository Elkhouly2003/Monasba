package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.request.PlaceRequest;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.services.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile ;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/place")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService ;

    @PostMapping(  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> addPlace(@ModelAttribute PlaceRequest placeRequest , @RequestParam int ownerId  ) {

        try {
            placeService.addPlace(placeRequest , ownerId );
        } catch (Exception e) {
            throw new RuntimeException(e) ;
        }
        return ResponseEntity.ok(new ApiResponse("Success" , "new place added successfully"));
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<ApiResponse> getPlaces(@PathVariable int placeId) {
        Place place ;
        try {
          place = placeService.getPlaceById(placeId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Success" ,place ));
    }

    @DeleteMapping("/{placeId}")
    public ResponseEntity<ApiResponse> deletePlace(@PathVariable int placeId) {
        try {
            placeService.deletePlaceById(placeId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Success" , "place deleted successfully"));
    }

}

