package com.example.GraduationBackend.services;

import com.example.GraduationBackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository ;


}
