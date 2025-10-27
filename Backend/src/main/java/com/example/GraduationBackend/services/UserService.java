package com.example.GraduationBackend.services;

import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User With id " + userId + " not found")
        );
    }

}
