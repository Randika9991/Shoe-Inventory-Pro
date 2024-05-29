package lk.ijse.gdse66.footflex.demo.repository;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/6/2024
*/

import lk.ijse.gdse66.footflex.demo.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepo extends JpaRepository<Supplier,String> {
    Supplier findTopByOrderByCodeDesc();
    List<Supplier> findByName(String name);

    Supplier findByCode(String id);
}
