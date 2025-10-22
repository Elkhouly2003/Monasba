package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.model.PlaceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceCategoryRepository extends JpaRepository<PlaceCategory, Long> {

    @Query("SELECT pc.category FROM PlaceCategory pc WHERE pc.place.placeId = :placeId")
    List<Category> findCategoriesByPlaceId(@Param("placeId") Long placeId);

    boolean existsByPlacePlaceIdAndCategoryId(int placeId, Long categoryId);

}
