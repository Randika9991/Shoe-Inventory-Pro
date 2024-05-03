package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/3/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.EmployeeDTO;
import lk.ijse.gdse66.footflex.demo.entity.Employee;
import lk.ijse.gdse66.footflex.demo.repository.EmployeeRepo;
import lk.ijse.gdse66.footflex.demo.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)),EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        if (!employeeRepo.existsById(employeeDTO.getCode())){
            throw new NotFoundException("Can't find employee id !!");
        }

        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)),EmployeeDTO.class);
    }

    @Override
    public boolean deleteEmployee(String id) {
        return false;
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll().stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public List<EmployeeDTO> searchEmployee(String name) {
        return employeeRepo.findByNameStartingWith(name).stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();
    }

    @Override
    public String generateNextId() {
        String prefix = "E";
        String id = "";

        Employee lastEmployee = employeeRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastEmployee != null) {
            String lastCode = lastEmployee.getCode();
            String numericPartString = lastCode.substring(prefix.length());
            try {
                int numericPart = Integer.parseInt(numericPartString);
                nextNumericPart = numericPart + 1;
            } catch (NumberFormatException e) {
                nextNumericPart = 1;
            }
        } else {
            nextNumericPart = 1;
        }
        id = prefix + String.format("%03d", nextNumericPart);

        return id;
    }
}
