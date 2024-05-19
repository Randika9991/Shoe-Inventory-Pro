package lk.ijse.gdse66.footflex.demo.dto;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDTO {
    private String orderId;
    private Timestamp orderDate;
    private Double totalPrice;
    private Integer addedPoints;
    private String paymentMethod;
    private String cashierName;
    private String customer_id;
    private String customerName;
    private List<OrderDetailDTO> orderDetailDTOList;
}