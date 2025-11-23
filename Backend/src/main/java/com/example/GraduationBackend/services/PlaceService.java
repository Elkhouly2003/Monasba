package com.example.GraduationBackend.services;

import com.example.GraduationBackend.dto.request.PlaceRequest;
import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.CategoryRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final PlaceCategoryService placeCategoryService;
    private final ImageService imageService;
    private final ModelMapper modelMapper;

    public void addPlace(PlaceRequest placeRequest, int ownerId) {

        User user = userRepository.findById(ownerId).orElseThrow(
                () -> new ResourceNotFoundException("User with id : " + ownerId + "not found")
        );

        Place place = modelMapper.map(placeRequest, Place.class);
        place.setImages(new ArrayList<>());
        place.setPlaceCategories(new ArrayList<>());
        place.setCertified(false);
        place.setOwner(user);
        Place savedPlace = placeRepository.save(place);

        List<String> categories = placeRequest.getCategories();

        for (String categoryName : categories) {
            Category category = categoryRepository.findByName(categoryName)
                    .orElseGet(() -> {
                        Category newCat = new Category();
                        newCat.setName(categoryName);
                        return categoryService.addCategory(newCat);
                    });


            placeCategoryService.addPlaceCategory(savedPlace.getPlaceId(), category.getId());
        }

        imageService.uploadPlaceImages(placeRequest.getImages(), savedPlace.getPlaceId());

    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Place getPlaceById(int placeId) {
        return placeRepository.findById(placeId).orElseThrow(
                () -> new ResourceNotFoundException("Place with id : " + placeId + "not found")
        );
    }

    public List<Place> getPlacesByUserId(Integer userId) {
        return placeRepository.findByOwnerUserId(userId);
    }

    @Transactional
    public void deletePlaceById(int placeId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new ResourceNotFoundException("Place with id: " + placeId + " not found"));
        place.getPlaceCategories().size();
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
