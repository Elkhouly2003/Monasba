package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
   List<Booking> findByUserUserId(int id);
   List<Booking> findBookingByPlacePlaceId(int id);
   List<Booking> findByPlaceOwnerUserId(Integer ownerId);
}
