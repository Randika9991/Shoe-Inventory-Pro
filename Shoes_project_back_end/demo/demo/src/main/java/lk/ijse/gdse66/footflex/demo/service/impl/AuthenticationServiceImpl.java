package lk.ijse.gdse66.footflex.demo.service.impl;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.auth.request.SignInRequest;
import lk.ijse.gdse66.footflex.demo.auth.request.SignUpRequest;
import lk.ijse.gdse66.footflex.demo.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.footflex.demo.dto.UserDTO;
import lk.ijse.gdse66.footflex.demo.entity.User;
import lk.ijse.gdse66.footflex.demo.repository.EmployeeRepo;
import lk.ijse.gdse66.footflex.demo.repository.UserRepo;
import lk.ijse.gdse66.footflex.demo.service.AuthenticationService;
import lk.ijse.gdse66.footflex.demo.service.JwtService;
import lk.ijse.gdse66.footflex.demo.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.footflex.demo.service.exception.IncorrectPasswordException;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import lk.ijse.gdse66.footflex.demo.util.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final EmployeeRepo employeeRepo;

    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        if (!userRepo.existsById(signInRequest.getEmail())){
            throw new NotFoundException("User email not found");
        }

        User userByEmail = userRepo.getAllByEmail(signInRequest.getEmail());
        if (!passwordEncoder.matches(signInRequest.getPassword(), userByEmail.getPassword())){
            throw new IncorrectPasswordException("Incorrect password");
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        User user = userRepo.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String generatedToken = jwtService.generateToken(user);
        return JwtAuthResponse.builder()
                .token(generatedToken)
                .role(user.getRole())
                .build();
    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();

        if (userRepo.existsById(email)) {
            throw new DuplicateRecordException("User Email already exists!");
        }

        if (!employeeRepo.existsByEmail(email)) {
            throw new NotFoundException("No Employee can be found with this email");
        }

        UserDTO userDTO = UserDTO.builder()
                .email(signUpRequest.getEmail())
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.valueOf(signUpRequest.getRole()))
                .build();
        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
        String generatedToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generatedToken).build();
    }

}

