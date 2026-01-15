package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.BookingDTO;
import com.example.GraduationBackend.dto.request.BookingRequest;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Booking;
import com.example.GraduationBackend.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookingss")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse> addBooking(@RequestBody BookingRequest bookingRequest) {
        bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok(new ApiResponse("Success !", "New booking added successfully"));
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking cancelled successfully"));
    }


    @GetMapping("user/{userId}")
    public ResponseEntity<ApiResponse> getBookingsByUserId(@PathVariable int userId) {
        List<BookingDTO> bookings = bookingService.getAllBookingsByUserId(userId);
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ApiResponse> getBookingById(@PathVariable Long bookingId) {
        BookingDTO booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", booking));
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> updateBooking(@RequestBody BookingRequest bookingRequest, @PathVariable Long bookingId) {
        bookingService.updateBooking(bookingId, bookingRequest);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking updated successfully"));
    }

    @GetMapping()
    public ResponseEntity<ApiResponse> getAllBookings() {
        List<BookingDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

    @PatchMapping("cancel/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking cancelled successfully"));
    }

    @PatchMapping("accept/{bookingId}")
    public ResponseEntity<ApiResponse> acceptBooking(@PathVariable Long bookingId) {
        bookingService.acceptBooking(bookingId);
        return ResponseEntity.ok(new ApiResponse("Success !", "Booking accepted successfully"));
    }

    @GetMapping("place/{placeId}")
    public ResponseEntity<ApiResponse>getAllBookingForSuchPlace(@PathVariable Integer placeId) {
        List<BookingDTO> bookings = bookingService.getAllBookingForPlace(placeId);
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

    @GetMapping("owner/{ownerId}")
    public ResponseEntity<ApiResponse>getAllBookingForPlacesOwner(@PathVariable Integer ownerId) {
        List<BookingDTO> bookings = bookingService.getAllBookingForOwner(ownerId);
        return ResponseEntity.ok(new ApiResponse("Success !", bookings));
    }

}
