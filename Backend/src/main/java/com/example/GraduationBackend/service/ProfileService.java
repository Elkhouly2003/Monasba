package com.example.GraduationBackend.service;


import com.example.GraduationBackend.io.ProfileRequest;
import com.example.GraduationBackend.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest request);
    ProfileResponse getProfile(String email);
    void sendResetOpt(String email);
    void restPassword(String email,String otp,String newPassword);
    void sendOtp(String email);
    void verifyOtp(String email,String otp);


}
