package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.UserDTO;
import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.io.ProfileRequest;
import com.example.GraduationBackend.io.ProfileResponse;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.services.EmailService;
import com.example.GraduationBackend.services.ProfileService;
import com.example.GraduationBackend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileUserController {
    private final ProfileService profileService;
    private final EmailService emailService;
    private final UserService userService;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid  @RequestBody ProfileRequest request){
        ProfileResponse response= profileService.createProfile(request);
        emailService.sendWelcomeEmail(response.getEmail(),response.getName());
        return response;
    }
   @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name")String email){
        return profileService.getProfile(email);
   }
    @GetMapping("users/{userId}")
    public ResponseEntity<ApiResponse> getUser(@PathVariable Integer userId) {
        UserDTO user = userService.getUserDtoById(userId);
        return ResponseEntity.ok(new ApiResponse("Success !", user));
    }
}
