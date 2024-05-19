package lk.ijse.gdse66.footflex.demo.repository;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/
import lk.ijse.gdse66.footflex.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order,String> {
    Order findTopByOrderByOrderIdDesc();

    @Query(value = "SELECT * FROM orders WHERE order_date >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 DAY)", nativeQuery = true)
    List<Order> getAllRefundOrders();

    @Query(value = "SELECT * FROM orders WHERE order_id =:orderId", nativeQuery = true)
    Order findByOrderId(String orderId);

    Order findOrderByOrderId(String orderId);
}