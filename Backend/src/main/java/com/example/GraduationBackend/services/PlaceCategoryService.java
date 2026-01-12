package com.example.GraduationBackend.services;

import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.PlaceCategory;
import com.example.GraduationBackend.repository.PlaceCategoryRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceCategoryService {
    private final PlaceCategoryRepository placeCategoryRepository;
    private final PlaceRepository placeRepository;
    private final CategoryService categoryService;

    public void addPlaceCategory(int placeId, Long categoryId ) {
        Place place;
        Category category;
        try {
              place = placeRepository.findById(placeId).orElseThrow(
                      () -> new ResourceNotFoundException("Place not found")
              ) ;
              category = categoryService.getCategoryById(categoryId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        boolean exists = placeCategoryRepository.existsByPlacePlaceIdAndCategoryId(placeId, categoryId);
        if (!exists) {
            PlaceCategory placeCategory = new PlaceCategory();
            placeCategory.setCategory(category);
//            placeCategory.setPlace(place);
            placeCategoryRepository.save(placeCategory);
        }

    }

    public List<Category> getAllCategoryByPlaceId(Long placeId) {
        return placeCategoryRepository.findCategoriesByPlaceId(placeId);
    }
}
