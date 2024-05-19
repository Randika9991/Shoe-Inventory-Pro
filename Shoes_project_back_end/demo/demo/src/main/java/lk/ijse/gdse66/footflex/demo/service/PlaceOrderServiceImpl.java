package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/
import jakarta.transaction.Transactional;
import lk.ijse.gdse66.footflex.demo.dto.CustomerDTO;
import lk.ijse.gdse66.footflex.demo.dto.InventoryDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDetailDTO;
import lk.ijse.gdse66.footflex.demo.embedded.OrderDetailPK;
import lk.ijse.gdse66.footflex.demo.entity.Customer;
import lk.ijse.gdse66.footflex.demo.entity.Order;
import lk.ijse.gdse66.footflex.demo.entity.OrderDetail;
import lk.ijse.gdse66.footflex.demo.repository.CustomerRepo;
import lk.ijse.gdse66.footflex.demo.repository.InventoryRepo;
import lk.ijse.gdse66.footflex.demo.repository.OrderDetailRepo;
import lk.ijse.gdse66.footflex.demo.repository.OrderRepo;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import lk.ijse.gdse66.footflex.demo.util.CustomerLoyaltyLevel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Transactional
@Service
public class PlaceOrderServiceImpl implements PlaceOrderService {

    @Autowired
    private OrderDetailRepo orderDetailRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(OrderDTO orderDTO) {
        Order order = mapper.map(orderDTO, Order.class);

        /*update customer ///////////////////////////*/
        Customer customer = customerRepo.findByCode(orderDTO.getCustomer_id());
        order.setCustomer_id(customer);

        int currentPoints = customer.getLoyaltyPoints();
        int addedPoints = orderDTO.getAddedPoints();

        int newPoints = currentPoints+addedPoints;
        CustomerLoyaltyLevel loyaltyLevel = null;
        if (newPoints < 10){
            loyaltyLevel = CustomerLoyaltyLevel.NEW;
        }else if (newPoints >= 10 && newPoints<30){
            loyaltyLevel = CustomerLoyaltyLevel.BRONZE;
        } else if (newPoints >= 30 && newPoints<100) {
            loyaltyLevel = CustomerLoyaltyLevel.SILVER;
        } else if (newPoints >= 100) {
            loyaltyLevel = CustomerLoyaltyLevel.GOLD;
        }
        customer.setLoyaltyLevel(loyaltyLevel);
        customer.setLoyaltyPoints(newPoints);

        System.out.println("order Date  ="+ orderDTO.getOrderDate());
        customer.setRecentPurchaseDate(orderDTO.getOrderDate());
        customerRepo.save(customer);

        /*update item and save order-details ////////////////////////////////*/
        orderRepo.save(order);

        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetailDTOList()) {
            OrderDetailPK orderDetailPK = new OrderDetailPK(detailDTO.getOrder_id(),detailDTO.getItem_code(),detailDTO.getSize());

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrderDetailPK(orderDetailPK);
            orderDetail.setItemName(detailDTO.getItemName());
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());
            orderDetail.setItemQty(detailDTO.getItemQty());

            orderDetailRepo.save(orderDetail);

            /*update item ////////////////////////////////*/
            int availableQty = inventoryRepo.findQtyByItemCodeAndSize(detailDTO.getItem_code(), detailDTO.getSize());
            int newQty = availableQty - detailDTO.getItemQty();

            String status;
            if (newQty<=0){
                status="Not Available";
            } else if (newQty<10) {
                status="Low";
            } else {
                status="Available";
            }
            inventoryRepo.updateByItemCodeAndSize(newQty, status, detailDTO.getItem_code(),detailDTO.getSize());
        }
    }

    @Override
    public InventoryDTO searchItemByCode(String code) {
        if (!inventoryRepo.existsById(code)){
            throw new NotFoundException("Item Code does not exists!");
        }
        return mapper.map(inventoryRepo.findByCode(code),InventoryDTO.class);
    }

    @Override
    public List<String> getAllItemCodes() {
        return inventoryRepo.findAllItemCodes();
    }

    @Override
    public CustomerDTO searchCustomerById(String code) {
        if (!customerRepo.existsById(code)){
            throw new NotFoundException("Customer Code does not exists!");
        }
        return mapper.map(customerRepo.findByCode(code),CustomerDTO.class);
    }

    @Override
    public List<String> getAllCustomerIds() {
        return customerRepo.findAllCustomerCodes();
    }

    @Override
    public String generateNextOrderId() {
        String prefix = "ORD-";
        String id = "";

        Order lastOrder = orderRepo.findTopByOrderByOrderIdDesc();
        int nextNumericPart;
        if (lastOrder != null) {
            String lastCode = lastOrder.getOrderId();
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
        id = prefix + String.format("%04d", nextNumericPart);

        System.out.println("Order next id ="+id);
        return id;
    }
}
