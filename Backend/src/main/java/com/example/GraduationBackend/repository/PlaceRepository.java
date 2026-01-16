package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {
    List<Place> findByOwnerUserId(Integer id);

    @Query("""
    SELECT p FROM Place p
    WHERE LOWER(p.placeName) LIKE :keyword
       OR LOWER(p.shortDescription) LIKE :keyword
       OR LOWER(p.city) LIKE :keyword
       OR LOWER(p.address) LIKE :keyword
""")
    List<Place> searchPlaces(String keyword);

    @Query("""
        SELECT DISTINCT p
        FROM Place p
        JOIN p.placeCategories pc
        JOIN pc.category c
        WHERE c.name = :categoryName
    """)
    List<Place> findPlacesByCategoryName(@Param("categoryName") String categoryName);

}
