package lk.ijse.gdse66.footflex.demo.controller;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.auth.request.SignInRequest;
import lk.ijse.gdse66.footflex.demo.auth.request.SignUpRequest;
import lk.ijse.gdse66.footflex.demo.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.footflex.demo.dto.CustomerDTO;
import lk.ijse.gdse66.footflex.demo.dto.EmployeeDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.UserDTO;
import lk.ijse.gdse66.footflex.demo.service.AuthenticationService;
import lk.ijse.gdse66.footflex.demo.service.EmployeeService;
import lk.ijse.gdse66.footflex.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        //System.out.println(signInRequest);
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }
    @PostMapping("/signUp")
    public ResponseEntity<JwtAuthResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @GetMapping("/searchByEmail")
    public UserDTO searchByEmail(@RequestParam("email")String email){
        return userService.searchByEmail(email);
    }

    @PatchMapping("/update")
    public UserDTO update(@RequestBody UserDTO userDTO){
        return userService.updateUser(userDTO);
    }
}

