package lk.ijse.gdse66.footflex.demo.entity;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/7/2024
*/

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {
    @Id
    private String code;
    private String description;
    private String category;
    private Double salePrice;
    private Double buyPrice;
    private Double profit;
    private Double profitMargin;
    private String status;
    private String supplierCode;
    private String supplierName;

    private Integer size_6;
    private Integer size_7;
    private Integer size_8;
    private Integer size_9;

    @Column(columnDefinition = "LONGTEXT")
    private String itemPic;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "item_code")
    private List<OrderDetail> orderDetails = new ArrayList<>();
}
