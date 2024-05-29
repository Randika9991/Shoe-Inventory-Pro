package lk.ijse.gdse66.footflex.demo.dto;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/6/2024
*/
import lk.ijse.gdse66.footflex.demo.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SupplierDTO {
    private String code;
    private String name;
    private String email;
    private SupplierCategory category;
    private String addressLine1;
    private String addressLine2;
    private String mobileContact;
    private String landLineContact;
}
