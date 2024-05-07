package lk.ijse.gdse66.footflex.demo.controller;/*
    this application is copyright protected
    Author : kumara
    Date : 5/7/2024
*/
import java.util.List;

import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.SupplierDTO;
import lk.ijse.gdse66.footflex.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    public InventoryController() {
        System.out.println("Inventory working !");
    }

    @GetMapping("/getAll")
    public List<InventoryDTO> getAllItem(){
        return inventoryService.getAllItem();
    }

    @PostMapping("/save")
    public InventoryDTO save(@RequestBody InventoryDTO inventoryDTO){
        return inventoryService.saveItem(inventoryDTO);
    }

    @PatchMapping("/update")
    public InventoryDTO update(@RequestBody InventoryDTO inventoryDTO){
        return inventoryService.updateItem(inventoryDTO);
    }

    @DeleteMapping("/delete")
    public boolean delete(@RequestParam("code") String code){
        return inventoryService.deleteItem(code);
    }

    @GetMapping("/searchByName")
    public List<InventoryDTO> searchByName(@RequestParam("name")String name){
        return inventoryService.searchItemByName(name);
    }

    @GetMapping("/searchById")
    public InventoryDTO searchById(@RequestParam("code") String code){
        return inventoryService.searchItemById(code);
    }

    @GetMapping("/loadSuppliersCode")
    public List<SupplierDTO> loadSuppliersCode(){
        return inventoryService.loadSupplierCode();
    }
}
