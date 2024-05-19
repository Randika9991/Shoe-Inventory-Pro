package lk.ijse.gdse66.footflex.demo.entity;/*
    this application is copyright protected
    Author : kumara
    Date : 4/30/2024
*/
import jakarta.persistence.*;
import lk.ijse.gdse66.footflex.demo.util.CustomerLoyaltyLevel;
import lk.ijse.gdse66.footflex.demo.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Customer {
    @Id
    private String code;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String contact;
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    private Date loyaltyDate;
    @Enumerated(EnumType.STRING)
    private CustomerLoyaltyLevel loyaltyLevel;
    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;
}
