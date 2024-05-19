package lk.ijse.gdse66.footflex.demo.service;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lk.ijse.gdse66.footflex.demo.dto.CustomDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDTO;
import lk.ijse.gdse66.footflex.demo.dto.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {
    List<OrderDTO> getAllRefundOrders();
    boolean refundOrder(String orderId);

    boolean refundOrderDetails(CustomDTO customDTO);
    OrderDTO getOrderByOrderId(String orderId);
    List<OrderDetailDTO> getOrderDetailListByOrderId(String orderId);
}
