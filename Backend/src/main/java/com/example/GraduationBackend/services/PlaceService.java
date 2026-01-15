package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.PlaceDTO;
import com.example.GraduationBackend.dto.request.BookingRequest;
import com.example.GraduationBackend.dto.request.PlaceRequest;
import com.example.GraduationBackend.model.*;
import com.example.GraduationBackend.repository.CategoryRepository;
import com.example.GraduationBackend.repository.NotificationRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final PlaceCategoryService placeCategoryService;
    private final ImageService imageService;
    private final ModelMapper modelMapper;

    public void addPlace(PlaceRequest placeRequest, int ownerId) {

        User owner = userRepository.findById(ownerId).orElseThrow(
                () -> new ResourceNotFoundException("User with id : " + ownerId + " not found")
        );


        Place place = new Place();
        place.setPlaceName(placeRequest.getPlaceName());
        place.setAddress(placeRequest.getAddress());
        place.setCity(placeRequest.getCity());
        place.setCountry(placeRequest.getCountry());
        place.setPhone(placeRequest.getPhone());
        place.setDescription(placeRequest.getDescription());
        place.setShortDescription(placeRequest.getShortDescription());
        place.setCapacity(placeRequest.getCapacity());
        place.setOpenTime(placeRequest.getOpenTime());
        place.setCloseTime(placeRequest.getCloseTime());
        place.setPrice(placeRequest.getPrice());
        place.setDiscount(placeRequest.getDiscount());

        place.setImages(new ArrayList<>());
        place.setPlaceCategories(new ArrayList<>());
        place.setCertified(false);
        place.setOwner(owner);

        Place savedPlace = placeRepository.save(place);

        List<String> categories = placeRequest.getCategories();
        if (categories != null && !categories.isEmpty()) {
            for (String categoryName : categories) {
                Category category = categoryRepository.findByName(categoryName)
                        .orElseGet(() -> {
                            Category newCat = new Category();
                            newCat.setName(categoryName);
                            return categoryService.addCategory(newCat);
                        });

                placeCategoryService.addPlaceCategory(savedPlace.getPlaceId(), category.getId());
            }
        }


        if (placeRequest.getImages() != null && !placeRequest.getImages().isEmpty()) {
            imageService.uploadPlaceImages(placeRequest.getImages(), savedPlace.getPlaceId());
        }

        Notification notification = new Notification();
        notification.setPlaceOwner(owner);
        notification.setPlace(place);
        notification.setMessage("a New Place Uploaded  Successfully In Monasba Website ");
        notificationRepository.save(notification);

    }

    public List<PlaceDTO> getAllPlaces() {
        List<Place> places = placeRepository.findAll();
        List<PlaceDTO> placeDTOs = new ArrayList<>();
        for (Place place : places) {
            PlaceDTO placeDTO = getPlaceDTOById(place.getPlaceId());
            placeDTOs.add(placeDTO);
        }

        return  placeDTOs ;
    }

    public Place getPlaceById(int placeId) {
        return placeRepository.findById(placeId).orElseThrow(
                () -> new ResourceNotFoundException("Place with id : " + placeId + "not found")
        );
    }

    public PlaceDTO getPlaceDTOById(int placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(null) ;
        if(place == null){
            throw  new ResourceNotFoundException("Place with id : " + placeId + "not found") ;
        }

        PlaceDTO placeDTO = new PlaceDTO() ;
        placeDTO.setOwnerID(place.getOwner().getUserId());
        placeDTO.setPlaceId(place.getPlaceId());
        placeDTO.setPlaceName(place.getPlaceName());
        placeDTO.setAddress(place.getAddress());
        placeDTO.setCity(place.getCity());
        placeDTO.setCountry(place.getCountry());
        placeDTO.setPhone(place.getPhone());
        placeDTO.setDescription(place.getDescription());
        placeDTO.setShortDescription(place.getShortDescription());
        placeDTO.setCapacity(place.getCapacity());
        placeDTO.setOpenTime(place.getOpenTime());
        placeDTO.setCloseTime(place.getCloseTime());
        placeDTO.setPrice(place.getPrice());
        placeDTO.setDiscount(place.getDiscount());

        List<Integer>imageIds = new ArrayList<>();
        List<Image> images = place.getImages();

        for(Image image : images){
            imageIds.add(image.getId());
        }
        placeDTO.setImagesID(imageIds);

        List<Review> reviews = place.getReviews();
        List<Integer> reviewIds = new ArrayList<>();
        for(Review review : reviews){
            reviewIds.add(review.getId());
        }
        placeDTO.setReviewsId(reviewIds);

        List<PlaceCategory> categories = place.getPlaceCategories();
        List<String> categoriesName = new ArrayList<>();
        for(PlaceCategory category : categories){
            categoriesName.add(category.getCategory().getName());
        }
        placeDTO.setCategories(categoriesName);

        return placeDTO ;
    }

    public List<PlaceDTO> getPlacesByUserId(Integer userId) {
        List<Place> place = placeRepository.findByOwnerUserId(userId);
        List<PlaceDTO> placeDTOs = new ArrayList<>();
        for (Place place1 : place) {
            PlaceDTO placeDTO = getPlaceDTOById(place1.getPlaceId());
            placeDTOs.add(placeDTO);
        }

        return placeDTOs ;
    }

    public List<PlaceDTO> getSavedPlacesForUser(Integer userId ) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User with id "+userId+" not found")
        );

        List<Place> savedPlaces = user.getSavedPlaces() ;
        List<PlaceDTO> placeDTOs = new ArrayList<>() ;
        for (Place place : savedPlaces) {
            PlaceDTO placeDTO = new PlaceDTO();
            placeDTO =  getPlaceDTOById(place.getPlaceId()) ;
            placeDTOs.add(placeDTO);
        }
        return placeDTOs ;
    }

    public void removeSavedPlace(Integer userId, Integer placeId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User with id "+userId+" not found")
        );
        Place place = placeRepository.findById(placeId).orElseThrow(
                () -> new RuntimeException("Place with id : " + placeId + "not found")
        );

        user.getSavedPlaces().remove(place);
        userRepository.save(user);
    }

    @Transactional
    public void deletePlaceById(int placeId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new ResourceNotFoundException("Place with id: " + placeId + " not found"));
       // place.getPlaceCategories().size();
        placeRepository.delete(place);
    }

    public void UpdatePlaceById(int placeId, PlaceRequest placeRequest) {
        Place place = placeRepository.findById(placeId).orElseThrow(
                () -> new ResourceNotFoundException("Place with id : " + placeId + " not found")
        );

        Optional.ofNullable(placeRequest.getPlaceName()).ifPresent(place::setPlaceName);
        Optional.ofNullable(placeRequest.getAddress()).ifPresent(place::setAddress);
        Optional.ofNullable(placeRequest.getCity()).ifPresent(place::setCity);
        Optional.ofNullable(placeRequest.getCountry()).ifPresent(place::setCountry);
        Optional.ofNullable(placeRequest.getDescription()).ifPresent(place::setDescription);
        Optional.ofNullable(placeRequest.getCapacity()).ifPresent(place::setCapacity);
        Optional.ofNullable(placeRequest.getPrice()).ifPresent(place::setPrice);
        Optional.ofNullable(placeRequest.getDiscount()).ifPresent(place::setDiscount);
        Optional.ofNullable(placeRequest.getPhone()).ifPresent(place::setPhone);
        Optional.ofNullable(placeRequest.getOpenTime()).ifPresent(place::setOpenTime);
        Optional.ofNullable(placeRequest.getCloseTime()).ifPresent(place::setCloseTime);

        placeRepository.save(place);
    }


    public List<Place> searchPlaces(String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            throw new IllegalArgumentException("Keyword cannot be empty");
        }

        String likeQuery = "%" + keyword.toLowerCase() + "%";

        List<Place> places = placeRepository.searchPlaces(likeQuery);

        if (places.isEmpty()) {
            throw new ResourceNotFoundException("No places found for: " + keyword);
        }

        return places;
    }

}
