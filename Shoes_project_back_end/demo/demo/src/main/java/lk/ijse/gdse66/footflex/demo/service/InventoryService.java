package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/7/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.SupplierDTO;

import java.util.List;

public interface InventoryService {
    InventoryDTO saveItem(InventoryDTO inventoryDTO);
    InventoryDTO updateItem(InventoryDTO inventoryDTO);
    boolean deleteItem(String id);
    List<InventoryDTO> getAllItem();
    List<InventoryDTO> searchItemByName(String name);
    InventoryDTO searchItemById(String id);
    String generateNextId();
    List<SupplierDTO> loadSupplierCode();


    List<InventoryDTO> getAllItemsByPrice(double minPrice, double maxPrice);

    List<InventoryDTO> getAllItemsByGender(String gender);
}

