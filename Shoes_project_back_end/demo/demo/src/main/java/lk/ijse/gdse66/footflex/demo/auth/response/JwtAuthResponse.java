package lk.ijse.gdse66.footflex.demo.auth.response;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthResponse {
    private String token;
    private Role role;
}

