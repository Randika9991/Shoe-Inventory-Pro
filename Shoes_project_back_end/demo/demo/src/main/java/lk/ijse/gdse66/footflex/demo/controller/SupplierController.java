package lk.ijse.gdse66.footflex.demo.controller;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/6/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.SupplierDTO;
import lk.ijse.gdse66.footflex.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    public SupplierController() {
        System.out.println("supplier working !");
    }

    @PostMapping("/save")
    public SupplierDTO save(@RequestBody SupplierDTO supplierDTO){
        //System.out.println(supplierDTO);
        return supplierService.saveSupplier(supplierDTO);
    }

    @PatchMapping("/update")
    public SupplierDTO update(@RequestBody SupplierDTO supplierDTO){
        return supplierService.updateSupplier(supplierDTO);
    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestParam("code") String code){
        return supplierService.deleteSupplier(code);
    }

    @GetMapping("/getAll")
    public List<SupplierDTO> getAllSuppliers(){
        return supplierService.getAllSupplier();
    }

    @GetMapping("/searchByName")
    public List<SupplierDTO> searchByName(@RequestParam("name") String name){
        return supplierService.searchSupplier(name);
    }

    @GetMapping("/searchById")
    public SupplierDTO searchByID(@RequestParam("id")String code){
        return supplierService.searchSupplierById(code);
    }

    @GetMapping("/nextId")
    public String nextId(){
        return supplierService.generateNextId();
    }
}
