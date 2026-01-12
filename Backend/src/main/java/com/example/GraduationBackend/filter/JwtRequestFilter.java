package com.example.GraduationBackend.filter;


import com.example.GraduationBackend.services.AppUserDetailsService;
import com.example.GraduationBackend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    final AppUserDetailsService appUserDetailsService;
    final JwtUtil jwtUtil;
    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    //    // URLs that don't require authentication
//    static final List<String> PUBLIC_URLS = List.of(
//            "/login", "/register", "/send-reset-otp", "/reset-password", "/logout"
//    );
    static final List<String> PUBLIC_URLS = List.of(
            "/login",
            "/register",
            "/send-reset-otp",
            "/reset-password",
            "/logout",

            // Swagger
            "/v3/api-docs/",
            "/swagger-ui/",
            "/swagger-ui.html",
            // Search API
            "/places/search/searchPlaces",
            // Categories API
            "/categories/"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        for (String publicUrl : PUBLIC_URLS) {
            if (pathMatcher.match(publicUrl, path)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        String jwt = null;
        String email = null;

        // 1️⃣ Check Authorization header
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
        }

        // 2️⃣ If not in header, check cookies
        if (jwt == null) {
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("jwt".equals(cookie.getName())) {
                        jwt = cookie.getValue();
                        break;
                    }
                }
            }
        }

        // 3️⃣ Validate JWT safely
        if (jwt != null) {
            try {
                email = jwtUtil.extractEmail(jwt);

                if (email != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails =
                            appUserDetailsService.loadUserByUsername(email);

                    if (jwtUtil.validateToken(jwt, userDetails)) {

                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        authenticationToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        SecurityContextHolder.getContext()
                                .setAuthentication(authenticationToken);
                    }
                }

            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("JWT expired");
                return;

            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}