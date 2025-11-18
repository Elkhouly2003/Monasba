package com.example.GraduationBackend.service;

import com.example.GraduationBackend.io.ProfileRequest;
import com.example.GraduationBackend.io.ProfileResponse;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

   public ProfileResponse createProfile(ProfileRequest request) {
        User newUserProfile=convertToUserEntity(request);
        if (!userRepository.existsByEmail(request.getEmail())) {
            newUserProfile = userRepository.save(newUserProfile);
            return convertToProfileResponse(newUserProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already exists");

    }

    @Override
    public ProfileResponse getProfile(String email) {
       User existingUser= userRepository.findByEmail(email)
               .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
       return convertToProfileResponse(existingUser);
    }

    @Override
    public void sendResetOpt(String email) {
        User existingUser= userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        //want generate 6 digit otp
        String otp=String.valueOf(ThreadLocalRandom.current().nextInt(100000,1000000));

        //calculate expiry time (current time +15 minutes in millisecond);
        long expiryTime=System.currentTimeMillis()+(15*60*1000);
        //update the profile/user
        existingUser.setResetOtp(otp);
        existingUser.setResetOtpExpireAt(expiryTime);
        //save in database
        userRepository.save(existingUser);
        try{
            emailService.sendRestOtpEmail(existingUser.getEmail(),otp);
        }catch (Exception ex){
            throw new RuntimeException("Unable to send email");

        }
   }

    @Override
    public void restPassword(String email, String otp, String newPassword) {
        User existingUser=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        if (existingUser.getResetOtp()==null||!existingUser.getResetOtp().equals(otp)){
            throw new RuntimeException("Invalid OTP");
        }
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        existingUser.setResetOtp(null);
        existingUser.setResetOtpExpireAt(0L);

        userRepository.save(existingUser);
    }

    @Override
    public void sendOtp(String email) {

        User existingUser= userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        if (existingUser.getIsAccountVerified()!=null&&existingUser.getIsAccountVerified()){
            return;
        }
        //want generate 6 digit otp
        String otp=String.valueOf(ThreadLocalRandom.current().nextInt(100000,1000000));

        //calculate expiry time (current time + 24 hours in millisecond);
        long expiryTime=System.currentTimeMillis()+(24*60*60*1000);

        existingUser.setVerifyOpt(otp);
        existingUser.setVerifyOtpExpireAt(expiryTime);
        //save in database
        userRepository.save(existingUser);
        try {
            emailService.sendOtpEmail(existingUser.getEmail(),otp);
        }catch (Exception e){
            throw new RuntimeException("Unable to send Email");

        }
    }

    @Override
    public void verifyOtp(String email, String otp) {
        User existingUser= userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        if (existingUser.getVerifyOpt()==null||!existingUser.getVerifyOpt().equals(otp)){
            throw new RuntimeException("Invalid OTP");
        }
        if (existingUser.getVerifyOtpExpireAt()<System.currentTimeMillis()){
            throw new RuntimeException("OTP Expired");
        }
        existingUser.setIsAccountVerified(true);
        existingUser.setVerifyOpt(null);
        existingUser.setVerifyOtpExpireAt(0L);
        userRepository.save(existingUser);
    }
    //who is user has  email  mhsam@gmail.com in database then get user
//    @Override
//    public String getLoggedInUserId(String email) {
//        UserEntity existingUser=userRepository.findByEmail(email)
//                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
//        return existingUser.getUserId();
//    }

    private ProfileResponse convertToProfileResponse(User newUserProfile) {
        return ProfileResponse.builder()
                .name(newUserProfile.getName())
                .email(newUserProfile.getEmail())
                .isAccountVerified(newUserProfile.getIsAccountVerified())
                .build();
    }


    private User convertToUserEntity(ProfileRequest request) {
      return   User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOtpExpireAt(0L)
                .verifyOpt(null)
                .verifyOtpExpireAt(null)
                .resetOtp(null)
                .build();

    }
}
