package lk.ijse.gdse66.footflex.demo.repository;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/3/2024
*/

import lk.ijse.gdse66.footflex.demo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,String> {
    Employee findTopByOrderByCodeDesc();
    List<Employee> findByNameStartingWith(String name);
    boolean existsByEmail(String email);
    Employee findByCode(String id);
    Employee findByEmail(String email);
}
