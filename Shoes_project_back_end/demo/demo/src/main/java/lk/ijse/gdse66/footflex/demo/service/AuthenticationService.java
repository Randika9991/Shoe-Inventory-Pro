package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.auth.request.SignInRequest;
import lk.ijse.gdse66.footflex.demo.auth.request.SignUpRequest;
import lk.ijse.gdse66.footflex.demo.auth.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}

