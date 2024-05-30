package lk.ijse.gdse66.footflex.demo.service.impl;/*
    this application is copyright protected
    Author : kumara
    Date : 4/30/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.CustomerDTO;
import lk.ijse.gdse66.footflex.demo.entity.Customer;
import lk.ijse.gdse66.footflex.demo.repository.CustomerRepo;
import lk.ijse.gdse66.footflex.demo.service.CustomerService;
import lk.ijse.gdse66.footflex.demo.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import lk.ijse.gdse66.footflex.demo.service.util.EmailUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)),CustomerDTO.class);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Customer customer = customerRepo.findById(customerDTO.getCode()).get();
        System.out.println("customer is "+customer);

        customerDTO.setLoyaltyLevel(customer.getLoyaltyLevel());
        customerDTO.setLoyaltyPoints(customer.getLoyaltyPoints());
        customerDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)), CustomerDTO.class);
    }

    @Override
    public boolean deleteCustomer(String code) {
        if (!customerRepo.existsById(code)) {
            return false;  // Customer does not exist
        }
        customerRepo.deleteById(code);
        return true;  // Customer deleted successfully
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepo.findAll().stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public List<CustomerDTO> searchCustomer(String name) {
        return customerRepo.findByNameStartingWith(name).stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();
    }

    @Override
    public String generateNextId() {
        String prefix = "C";
        String id = "";

        Customer lastCustomer = customerRepo.findTopByOrderByCodeDesc();
        int nextNumericPart;
        if (lastCustomer != null) {
            String lastCode = lastCustomer.getCode();
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

    @Override
    public List<String> sendWishes() {
        List<String> custStringList = new ArrayList<>();

        List<Customer> customersByBirthdayToday = customerRepo.findCustomersByBirthdayToday();
        customersByBirthdayToday.forEach(customer -> {
            try {
                EmailUtil.sendEmail(customer.getEmail(), "Happy Birthday!", "Happy Birthday " + customer.getName() + "!");
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }finally {
                String custCode = customer.getCode();
                String name = customer.getName();
                String together = custCode + " - " + name;
                custStringList.add(together);

            }
        });
        return custStringList;
    }
}
