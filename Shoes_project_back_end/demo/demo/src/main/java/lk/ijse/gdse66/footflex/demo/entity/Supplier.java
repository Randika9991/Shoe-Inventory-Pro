package lk.ijse.gdse66.footflex.demo.entity;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/6/2024
*/

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.gdse66.footflex.demo.util.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    private String code;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
    private SupplierCategory category;
    private String addressLine1;
    private String addressLine2;
    private String mobileContact;
    private String landLineContact;
}
