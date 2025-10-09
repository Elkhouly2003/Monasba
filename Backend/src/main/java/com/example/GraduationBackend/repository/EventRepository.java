package com.example.GraduationBackend.repository;


import com.example.GraduationBackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Booking, Integer> {

}
