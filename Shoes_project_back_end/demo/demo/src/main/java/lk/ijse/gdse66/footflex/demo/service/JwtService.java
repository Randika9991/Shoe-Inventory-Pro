package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import org.springframework.security.core.userdetails.UserDetails;

//@Service
public interface JwtService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
}

