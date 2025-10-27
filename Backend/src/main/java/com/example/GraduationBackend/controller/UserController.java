package com.example.GraduationBackend.controller;


import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.User;
import com.example.GraduationBackend.repository.UserRepository;
import com.example.GraduationBackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth0")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/register")
    public Map<String, Object> registerUser(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> response = new HashMap<>();

        String auth0Id = jwt.getClaim("sub");
        String email = jwt.getClaim("email");
        String username = jwt.getClaim("https://luv2code-react-library.com/username");
        String phone = jwt.getClaim("https://luv2code-react-library.com/phone_number");
        List<String> rolesList = jwt.getClaim("https://luv2code-react-library.com/roles");
        String role = (rolesList != null && !rolesList.isEmpty()) ? rolesList.get(0) : "User";

        var existingUser = userRepository.findByAuth0Id(auth0Id);

        User user;

        if (existingUser.isEmpty()) {

            user = new User();
            user.setAuth0Id(auth0Id);
            user.setEmail(email);
            user.setUsername(username);
            user.setPhone(phone);
            user.setRole(role);
            user.setTotalRevenue(0.0);
            userRepository.save(user);
            response.put("message", "User created successfully!");
        } else {

            user = existingUser.get();
            boolean updated = false;

            if (!email.equals(user.getEmail())) {
                user.setEmail(email);
                updated = true;
            }
            if (username != null && !username.equals(user.getUsername())) {
                user.setUsername(username);
                updated = true;
            }
            if (phone != null && !phone.equals(user.getPhone())) {
                user.setPhone(phone);
                updated = true;
            }
            if (role != null && !role.equals(user.getRole())) {
                user.setRole(role);
                updated = true;
            }

            if (updated) {
                userRepository.save(user);
                response.put("message", "User data updated successfully!");
            } else {
                response.put("message", "User already exists and data is up to date!");
            }
        }

        response.put("user", user);
        return response;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUser(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(new ApiResponse("Success !", user));
    }

}
