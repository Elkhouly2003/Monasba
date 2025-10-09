package com.example.GraduationBackend.services;

import com.example.GraduationBackend.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageService  {
   private final ImageRepository imageRepository;

 

}
