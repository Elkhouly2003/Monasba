package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Image;
import com.example.GraduationBackend.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/imagess")
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable int id) {
        Image image = imageService.getImageById(id);

        try {
            byte[] bytes = image.getImage().getBytes(1L, (int) image.getImage().length());
            ByteArrayResource resource = new ByteArrayResource(bytes);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.parseMediaType(image.getFileType()))
                    .contentLength(bytes.length)
                    .body(resource);

        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error While Reading Image", e.getMessage()));
        }

    }

    @GetMapping
    public ResponseEntity<ApiResponse> getImages() {
        List<Image> images = imageService.getAllImages();
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Success", images));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse> uploadProfileImage(@RequestParam MultipartFile file, @PathVariable int userId) {
        imageService.uploadUserImage(file, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Success !", "Profile Image Uploaded Successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> uploadImagesForPlace(@RequestParam List<MultipartFile> files, @RequestParam int placeId) {
        imageService.uploadPlaceImages(files, placeId);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Success", "images uploaded successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteImage(@PathVariable int id) {
        imageService.deleteImageById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Success", "Deleted success"));
    }

    @PutMapping("/{imageId}")
    public ResponseEntity<ApiResponse> updateImage(@PathVariable int imageId, @RequestParam MultipartFile file) {
        imageService.updateImage(file, imageId);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Success", "Image updated successfully"));
    }


}
