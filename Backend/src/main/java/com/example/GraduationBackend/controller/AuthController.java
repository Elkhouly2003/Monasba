package com.example.GraduationBackend.controller;


import com.example.GraduationBackend.io.AuthRequest;
import com.example.GraduationBackend.io.AuthResponse;
import com.example.GraduationBackend.io.RestPasswordRequest;
import com.example.GraduationBackend.service.AppUserDetailsService;
import com.example.GraduationBackend.service.ProfileService;
import com.example.GraduationBackend.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager; // Spring Security authentication manager
    private final AppUserDetailsService appUserDetailsService; // load user details
    private final JwtUtil jwtUtil; // generate and validate JWT
    private final ProfileService profileService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try {
            // Authenticate user with email and password
            //send to spring Security to verify
            authentication(request.getEmail(), request.getPassword());

            // Load user details after successful authentication
            final UserDetails userDetails = appUserDetailsService.loadUserByUsername(request.getEmail());

            // Generate JWT token
            final String jwtToken = jwtUtil.generateToken(userDetails);

            // Create HTTP-only cookie with JWT
            ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true) // prevent JS access
                    .path("/")      // cookie path
                    .maxAge(Duration.ofDays(1)) // expires in 1 day
                    .sameSite("Strict") // prevent CSRF
                    .build();

            // Return JWT in cookie and in response body
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthResponse(request.getEmail(), jwtToken));

        } catch (BadCredentialsException ex) {
            // Wrong email or password
            Map<String,Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Email or password incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

        } catch (DisabledException ex) {
            // Account is disabled
            Map<String,Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Account is disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

        } catch (Exception ex) {
            // Any other authentication failure
            Map<String,Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    private void authentication(String email, String password) {
        //if problem methode do exception
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
    @GetMapping("/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticated(@CurrentSecurityContext(expression = "authentication?.name")String email){
            return ResponseEntity.ok(email!=null);
    }
    @PostMapping("/send-rest-otp")
    public void sendRestOtp(@RequestParam String email){
        try {
            profileService.sendResetOpt(email);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());

        }
    }

    @PostMapping("/rest-password")
    public void resetPassword(@Valid @RequestBody RestPasswordRequest request){
        try {
            profileService.restPassword(request.getEmail(),request.getOtp(),request.getNewPassword());
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());

        }
    }
    @PostMapping("/send-otp")
    public void sendVerifyOtp(@CurrentSecurityContext(expression = "authentication?.name")String email){
        try{
            profileService.sendOtp(email);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
        }
    }
    @PostMapping("/verify-otp")
    public void verifyEmail(@RequestBody Map<String,Object> request
            ,@CurrentSecurityContext(expression = "authentication?.name")String email)
    {
        if (request.get("otp").toString()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Missing details");

        }
       try{
           profileService.verifyOtp(email,request.get("otp").toString());
       }catch (Exception e){
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage());
       }
    }





}
