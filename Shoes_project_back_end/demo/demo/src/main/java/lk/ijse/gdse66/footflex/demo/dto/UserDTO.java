package lk.ijse.gdse66.footflex.demo.dto;
/*
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
public class UserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private Role role;
}
