package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.PlaceDTO;
import com.example.GraduationBackend.dto.request.PlaceRequest;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.services.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/placess")
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> addPlace(@ModelAttribute PlaceRequest placeRequest, @RequestParam int ownerId) {
        placeService.addPlace(placeRequest, ownerId);
        return ResponseEntity.ok(new ApiResponse("Success", "new place added successfully"));
    }


    @GetMapping()
    public ResponseEntity<ApiResponse> getAllPlaces() {
        List<PlaceDTO> places = placeService.getAllPlaces();

        if (places.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(new ApiResponse("Success", places));
        }
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<ApiResponse> getPlaces(@PathVariable int placeId) {
        PlaceDTO place = placeService.getPlaceDTOById(placeId);
        return ResponseEntity.ok(new ApiResponse("Success", place));
    }

    @DeleteMapping("place/{placeId}/user/{userId}")
    public ResponseEntity<ApiResponse> deletePlace(@PathVariable int placeId ,@PathVariable int userId) {
        placeService.deletePlaceById(placeId ,  userId );
        return ResponseEntity.ok(new ApiResponse("Success", "place deleted successfully"));
    }

    @PutMapping("/{placeId}")
    public ResponseEntity<ApiResponse> updatePlace(@ModelAttribute PlaceRequest placeRequest, @PathVariable int placeId) {
        placeService.UpdatePlaceById(placeId, placeRequest);
        return ResponseEntity.ok(new ApiResponse("Success", "place updated successfully"));
    }

    @GetMapping("owner/{ownerId}")
    public ResponseEntity<ApiResponse> getPlacesByOwnerId(@PathVariable Integer ownerId) {
        List<PlaceDTO> places = placeService.getPlacesByUserId(ownerId);

        if (places.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse("no places found", null));
        }
        return ResponseEntity.ok(new ApiResponse("Success", places));

    }
    @GetMapping("category/{categoryName}")
    public ResponseEntity<ApiResponse> getPlacesByCategoryName(@PathVariable String categoryName) {
        List<PlaceDTO> places = placeService.getPlaceByCategoryName(categoryName);

        return ResponseEntity.ok(new ApiResponse("Success", places));
    }
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchForPlaces(@RequestParam String query) {
        return ResponseEntity.ok(new ApiResponse("Search Success", placeService.searchPlaces(query)));
    }

}

