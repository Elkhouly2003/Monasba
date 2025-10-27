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
        bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(new ApiResponse("Success !", "New booking added successfully"));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking cancelled successfully"));
    }


    @GetMapping("user/{userId}")
    public ResponseEntity<ApiResponse> getBookingsByUserId(@PathVariable int userId) {
        List<Booking> bookings = bookingService.getAllBookingsByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ApiResponse> getBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", booking));
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> updateBooking(@RequestBody BookingRequest bookingRequest, @PathVariable Long bookingId) {
        bookingService.updateBooking(bookingId, bookingRequest);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking updated successfully"));
    }

    public ResponseEntity<ApiResponse> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

    @PatchMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBookings(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking cancelled successfully"));
    }


}
