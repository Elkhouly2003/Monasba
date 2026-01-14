package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.BookingDTO;
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
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingDTO> bookingDTOS = new ArrayList<>();

        for (Booking booking : bookings) {
             BookingDTO bookingDTO = getBookingById(booking.getId().longValue()) ;

             bookingDTOS.add(bookingDTO);
        }

        return bookingDTOS ;
    }

   public List<BookingDTO> getAllBookingsByUserId(int userID ) {
        List<Booking> bookings = bookingRepository.findByUserUserId(userID);
        List<BookingDTO> bookingDTOS = new ArrayList<>();

        for (Booking booking : bookings) {
            BookingDTO bookingDTO = getBookingById(booking.getId().longValue()) ;
            bookingDTOS.add(bookingDTO);
        }
      return   bookingDTOS ;
   }

   public BookingDTO getBookingById(Long bookingID) {
        Booking booking =  bookingRepository.findById(bookingID).orElseThrow(
                () -> new ResourceNotFoundException("Booking with id "+ bookingID +" not found")
        );

       BookingDTO bookingDTO = new BookingDTO();
       bookingDTO.setBookingId(booking.getId());
       bookingDTO.setUserId(booking.getUser().getUserId());
       bookingDTO.setPlaceId(booking.getPlace().getPlaceId());
       bookingDTO.setPrice(booking.getPrice());
       bookingDTO.setCategory(booking.getCategory());
       bookingDTO.setStatus(booking.getStatus());
       bookingDTO.setBookingDate(booking.getBookingDate()+"");
       bookingDTO.setStartDate(booking.getStartDate()+"");
       bookingDTO.setEndDate(booking.getEndDate()+"");
       bookingDTO.setCapacity(booking.getCapacity());
       bookingDTO.setTitle(booking.getTitle());
       bookingDTO.setDescription(booking.getDescription());

        return  bookingDTO ;
   }

    public void deleteBooking(Long bookingID) {
        bookingRepository.findById(bookingID).ifPresentOrElse(bookingRepository::delete , ()->{
            throw new ResourceNotFoundException("Booking with id "+ bookingID +" not found");
        });
    }
    public void cancelBooking(Long bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow(
                () -> new ResourceNotFoundException("Booking with id "+ bookingID +" not found")
        );
        booking.setStatus("cancelled");
        bookingRepository.save(booking);
    }

    public void updateBooking(Long bookingID, BookingRequest bookingRequest) {
          Booking booking = bookingRepository.findById(bookingID).orElseThrow(
                  () -> new ResourceNotFoundException("Booking with id "+ bookingID +" not found")
          );
        Optional.ofNullable(bookingRequest.getDescription()).ifPresent(booking::setDescription);
        Optional.ofNullable(bookingRequest.getCapacity()).ifPresent(booking::setCapacity);
        Optional.ofNullable(bookingRequest.getStartDate()).ifPresent(booking::setStartDate);
        Optional.ofNullable(bookingRequest.getEndDate()).ifPresent(booking::setEndDate);
        Optional.ofNullable(bookingRequest.getTitle()).ifPresent(booking::setTitle);
        Optional.ofNullable(bookingRequest.getCapacity()).ifPresent(booking::setCapacity);
        booking.setLastUpdate(LocalDateTime.now());
        bookingRepository.save(booking);

    }
}
