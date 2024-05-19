package lk.ijse.gdse66.footflex.demo.entity;/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "order_id")
    private String orderId;
    private Timestamp orderDate;
    private Double totalPrice;
    private Integer addedPoints;
    private String paymentMethod;
    private String cashierName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "code")
    private Customer customer_id;
    private String customerName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "order_id")
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
