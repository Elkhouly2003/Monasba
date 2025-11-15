package com.example.GraduationBackend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Secret key used for signing and verifying JWTs
    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    // Generate JWT token for a given user
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    // Create JWT token with claims, subject (email), issued date, expiration, and signature
    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)                        // Set the subject (usually username/email)
                .setIssuedAt(new Date(System.currentTimeMillis())) // Token creation time
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10)) // Token expiry (10 hours)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)   // Sign token with HS256 algorithm and secret key
                .compact();                              // Build the token string
    }

    // Extract all claims from a token
    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)       // Use the secret key to validate token signature
                .parseClaimsJws(token)           // Parse the JWT
                .getBody();                      // Return all claims inside the token
    }

    // Extract a specific claim using a claims resolver function
    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract the email/username (subject) from the token
    public String extractEmail(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration date from the token
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    // Check if token has expired
    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    // Validate the token for a specific user
    public Boolean validateToken(String token, UserDetails userDetails){
        final String email = extractEmail(token);
        // Token is valid if email matches username and token is not expired
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
