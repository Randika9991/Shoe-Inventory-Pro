package lk.ijse.gdse66.footflex.demo.auth.request;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInRequest {
    private String email;
    private String password;
}

