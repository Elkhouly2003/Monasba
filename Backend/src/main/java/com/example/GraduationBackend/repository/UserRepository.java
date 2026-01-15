package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM user_saved_places WHERE place_id = :placeId",
            nativeQuery = true
    )
    void deleteSavedPlacesByPlaceId(@Param("placeId") Integer placeId);

    @Query("SELECT u.userId FROM User u WHERE u.email = :email")
    Optional<Integer> findIdByEmail(@Param("email") String email);
}
