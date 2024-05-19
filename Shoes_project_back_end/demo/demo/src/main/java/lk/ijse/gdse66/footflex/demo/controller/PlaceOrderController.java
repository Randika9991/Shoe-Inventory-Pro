package lk.ijse.gdse66.footflex.demo.controller;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.CustomerDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDTO;
import lk.ijse.gdse66.footflex.demo.service.PlaceOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/placeOrder")
@CrossOrigin(origins = "*")
public class PlaceOrderController {
    @Autowired
    private PlaceOrderService placeOrderService;

    public PlaceOrderController() {
        System.out.println("PlaceOrder working !");
    }

    @PostMapping("/placeOrder")
    public void placeOrder(@RequestBody OrderDTO orderDTO){
        placeOrderService.placeOrder(orderDTO);
    }
    @GetMapping("/searchItemByCode")
    public InventoryDTO searchItemByCode(@RequestParam("code") String code){
        return placeOrderService.searchItemByCode(code);
    }
    @GetMapping("/loadItemCodes")
    public List<String> loadItemCodes(){
        return placeOrderService.getAllItemCodes();
    }
    @GetMapping("/searchCusById")
    public CustomerDTO searchCustomerById(@RequestParam("code") String code){
        return placeOrderService.searchCustomerById(code);
    }
    @GetMapping("/loadCusIds")
    public List<String> loadCustomerIds(){
        return placeOrderService.getAllCustomerIds();
    }

    @GetMapping("/nextOrderId")
    public String nextOrderId(){
        return placeOrderService.generateNextOrderId();
    }
}
