package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.request.BookingRequest;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Booking;
import com.example.GraduationBackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse> addBooking(@RequestBody BookingRequest bookingRequest) {
        try {
            bookingService.createBooking(bookingRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
      return ResponseEntity.ok(new ApiResponse("Success !" ,"New booking added successfully"));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Success !" ,"Booking cancelled successfully"));
    }


    @GetMapping("user/{userId}")
    public ResponseEntity<ApiResponse> getBookingsByUserId(@PathVariable int userId) {
        List<Booking> bookings = bookingService.getAllBookingsByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Success !" ,bookings));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ApiResponse> getBookingById(@PathVariable Long bookingId) {
        Booking booking ;
        try {
          booking = bookingService.getBookingById(bookingId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Success !" ,booking));
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> updateBooking(@RequestBody BookingRequest bookingRequest ,@PathVariable Long bookingId) {
        try {
            bookingService.updateBooking(bookingId , bookingRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Success !" ,"Booking updated successfully"));
    }

}
