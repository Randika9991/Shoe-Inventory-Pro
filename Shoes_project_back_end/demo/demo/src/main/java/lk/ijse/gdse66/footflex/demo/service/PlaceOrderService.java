package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.CustomerDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDTO;

import java.util.List;

public interface PlaceOrderService {

    void placeOrder(OrderDTO orderDTO);
    InventoryDTO searchItemByCode(String code);
    List<String> getAllItemCodes();
    CustomerDTO searchCustomerById(String code);
    List<String> getAllCustomerIds();
    String generateNextOrderId();
}
