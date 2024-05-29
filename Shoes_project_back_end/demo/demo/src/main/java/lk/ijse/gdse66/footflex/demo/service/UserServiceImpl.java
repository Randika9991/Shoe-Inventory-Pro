package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.EmployeeDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.UserDTO;
import lk.ijse.gdse66.footflex.demo.entity.Inventory;
import lk.ijse.gdse66.footflex.demo.entity.User;
import lk.ijse.gdse66.footflex.demo.repository.EmployeeRepo;
import lk.ijse.gdse66.footflex.demo.repository.UserRepo;
import lk.ijse.gdse66.footflex.demo.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final EmployeeRepo employeeRepo;
    private final ModelMapper mapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new
                        UsernameNotFoundException(
                        "user not found"));
    }

    @Override
    public void Save(UserDTO userDTO) {
        if (userRepo.existsById(userDTO.getEmail())){
            throw new DuplicateRecordException("User Email is already exists!");
        } else if (!employeeRepo.existsByEmail(userDTO.getEmail())) {
            throw new NotFoundException("No Employee can be found this email");
        } else {
            userRepo.save(mapper.map(userDTO, User.class));
        }
    }
    @Override
    public UserDTO searchByEmail(String email) {
        return mapper.map(userRepo.findByEmail(email),UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        if (!userRepo.existsById(userDTO.getEmail())){
            throw new NotFoundException("user Code does not exists!");
        }
        System.out.println("userServiceUpdate");
        return mapper.map(userRepo.save(mapper.map(userDTO, User.class)), UserDTO.class);
    }
}

