package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/
import lk.ijse.gdse66.footflex.demo.dto.EmployeeDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    void Save(UserDTO userDTO);
    UserDTO searchByEmail(String email);
    UserDTO updateUser(UserDTO userDTO);
}
