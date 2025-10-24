package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.request.BookingRequest;
import com.example.GraduationBackend.model.Booking;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.BookingRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository ;
    private final ModelMapper modelMapper ;
    private final UserRepository userRepository ;
    private final PlaceRepository placeRepository ;


    public void createBooking(BookingRequest bookingRequest) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(BookingRequest.class, Booking.class)
                .addMappings(mapper -> {
                    mapper.skip(Booking::setId);
                    mapper.skip(Booking::setBookingDate);
                    mapper.skip(Booking::setUser);
                    mapper.skip(Booking::setPlace);
                    mapper.skip(Booking::setPrice);
                });

        Booking booking = modelMapper.map(bookingRequest, Booking.class);

        int userID = bookingRequest.getUserId();
        User user = userRepository.findById(userID).orElseThrow(
                () -> new RuntimeException("User With id "+ userID +"not found")
        );

        int placeId = bookingRequest.getPlaceId();
        Place place = placeRepository.findById(placeId).orElseThrow(
                () -> new RuntimeException("Place With id "+ placeId +"not found")
        );

        booking.setUser(user);
        booking.setPlace(place);
        booking.setPrice(place.getPrice());
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("pending");

        bookingRepository.save(booking);
    }

    public void deleteBooking(Long bookingID) {
        bookingRepository.findById(bookingID).ifPresentOrElse(bookingRepository::delete , ()->{
            throw new RuntimeException("Booking with id "+ bookingID +" not found");
                });
    }

   public List<Booking> getAllBookingsByUserId(int userID ) {
      return  bookingRepository.findByUserUserId(userID);
   }

   public Booking getBookingById(Long bookingID) {
        return bookingRepository.findById(bookingID).orElseThrow(
                () -> new RuntimeException("Booking with id "+ bookingID +" not found")
        );
   }

    public void updateBooking(Long bookingID, BookingRequest bookingRequest) {
          Booking booking = bookingRepository.findById(bookingID).orElseThrow(
                  () -> new RuntimeException("Booking with id "+ bookingID +" not found")
          );
        Optional.ofNullable(bookingRequest.getDescription()).ifPresent(booking::setDescription);
        Optional.ofNullable(bookingRequest.getCapacity()).ifPresent(booking::setCapacity);
        Optional.ofNullable(bookingRequest.getStartDate()).ifPresent(booking::setStartDate);
        Optional.ofNullable(bookingRequest.getEndDate()).ifPresent(booking::setEndDate);
        Optional.ofNullable(bookingRequest.getTitle()).ifPresent(booking::setTitle);
        Optional.ofNullable(bookingRequest.getCapacity()).ifPresent(booking::setCapacity);

        booking.setLastUpdate(LocalDateTime.now());

    }
}
