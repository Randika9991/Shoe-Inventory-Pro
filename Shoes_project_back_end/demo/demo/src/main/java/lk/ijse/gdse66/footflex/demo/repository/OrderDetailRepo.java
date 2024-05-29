package lk.ijse.gdse66.footflex.demo.repository;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lk.ijse.gdse66.footflex.demo.embedded.OrderDetailPK;
import lk.ijse.gdse66.footflex.demo.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepo extends JpaRepository<OrderDetail, OrderDetailPK> {

    @Query(value = "SELECT * FROM order_detail WHERE order_id = :orderId", nativeQuery = true)
    List<OrderDetail> findOrderDetailsByOrderId(String orderId);

}
