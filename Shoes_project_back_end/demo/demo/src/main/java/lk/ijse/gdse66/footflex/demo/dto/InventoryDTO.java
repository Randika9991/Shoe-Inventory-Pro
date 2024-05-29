package lk.ijse.gdse66.footflex.demo.dto;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/7/2024
*/

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
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
    private String itemPic;
}
