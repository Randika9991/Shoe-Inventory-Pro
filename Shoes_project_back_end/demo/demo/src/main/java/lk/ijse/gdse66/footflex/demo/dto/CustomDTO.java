package lk.ijse.gdse66.footflex.demo.dto;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private String orderId;
    private String itemCode;
    private String size;
    private Integer qty;
    private Double unitTotalPrice;
    private Integer arrayLength;
}
