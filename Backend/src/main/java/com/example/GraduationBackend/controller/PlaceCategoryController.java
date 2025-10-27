package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.services.PlaceCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/placeCategory")
@RequiredArgsConstructor
public class PlaceCategoryController {
    private final PlaceCategoryService placeCategoryService;

    @PostMapping
    public ResponseEntity<ApiResponse> addPlaceCategory(@RequestParam int placeId, @RequestParam Long categoryId) {
        placeCategoryService.addPlaceCategory(placeId, categoryId);
        return ResponseEntity.ok(new ApiResponse("success", "PlaceCategory added successfully"));
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<ApiResponse> getAllCategoriesByPlaceId(@PathVariable Long placeId) {
        List<Category> categories = placeCategoryService.getAllCategoryByPlaceId(placeId);

        return ResponseEntity.ok(new ApiResponse("success", categories));
    }

}
