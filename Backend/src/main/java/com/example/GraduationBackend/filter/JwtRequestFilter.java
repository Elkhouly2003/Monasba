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
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html",
        // Search API
        "/places/search/searchPlaces",
        // Categories API
        "/categories/**"
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

        // Check JWT in Authorization header
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix
        }

        //  If not found in header, check cookies
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

        //  Validate token and set authentication context
        if (jwt != null) {
            email = jwtUtil.extractEmail(jwt);

            // Only authenticate if not already done
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = appUserDetailsService.loadUserByUsername(email);

                // Validate the token against user details
                if (jwtUtil.validateToken(jwt, userDetails)) {

                    // Create authentication token for the user
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );

                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // Set authentication in security context
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
        }

        //  Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
