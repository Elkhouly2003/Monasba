package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService ;

    @GetMapping("/p")
    public void checkoutBookByUser(@AuthenticationPrincipal Jwt jwt,
                                      @RequestParam Long bookId) {
        String userEmail = jwt.getClaim("email");
        String userName = jwt.getClaim("name");
        String phone = jwt.getClaim("phone");
        List<String> roles = jwt.getClaimAsStringList("https://luv2code-react-library.com/roles");

        System.out.println("User email : " + userEmail);
        System.out.println("User name : " + userName);
        System.out.println("Phone : " + phone);
 }




}
