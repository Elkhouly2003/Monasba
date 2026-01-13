package com.example.GraduationBackend.services;

import com.example.GraduationBackend.model.Image;
import com.example.GraduationBackend.model.Place;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.ImageRepository;
import com.example.GraduationBackend.repository.PlaceRepository;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final PlaceRepository placeRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public Image getImageById(int id) {
        return imageRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Image with id " + id + " not found")
        );
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public void deleteImageById(int id) {
        imageRepository.findById(id).ifPresentOrElse(imageRepository::delete, () ->
                {
                    throw new ResourceNotFoundException("Image with id " + id + " Not Found");
                }
        );
    }

    public void uploadUserImage(MultipartFile file, Integer userId) {
        User user = userService.getUserById(userId);
        Image image;
        try {
            image = new Image();
            image.setImage(new SerialBlob(file.getBytes()));
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setPlace(null);
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
        Image savedImage = imageRepository.save(image);
        user.setImage(savedImage);
        userRepository.save(user);


    }

    public void uploadPlaceImages(List<MultipartFile> files, int placeId) {

        Place place = placeRepository.findById(placeId).orElseThrow(
                () -> new ResourceNotFoundException("Place with id " + placeId + " not found")
        );

        for (MultipartFile file : files) {
            try {
                Image image = new Image();
                image.setImage(new SerialBlob(file.getBytes()));
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setPlace(place);

                Image savedImage = imageRepository.save(image);

                String imageUrl = "api/v1/images/" + savedImage.getId();
                image.setImageUrl(imageUrl);

                imageRepository.save(image);


            } catch (SQLException | IOException e) {
                throw new RuntimeException(e);
            }

        }
    }

    public void updateImage(MultipartFile file, int imageId) {
        Image image = imageRepository.findById(imageId).orElseThrow(
                () -> new ResourceNotFoundException("Image with id " + imageId + " not found")
        );

        try {
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        } catch (SQLException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Image> getImagesByPlaceId(Integer placeId){
        return imageRepository.findByPlacePlaceId(placeId);
    }


}
