package lk.ijse.gdse66.footflex.demo.dto;
/*
    this application is copyright protected
    Author : kumara
    Date : 4/30/2024
*/

import lk.ijse.gdse66.footflex.demo.util.CustomerLoyaltyLevel;
import lk.ijse.gdse66.footflex.demo.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {
    private String code;
    private String name;
    private String email;
    private Gender gender;
    private String contact;
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    private Date loyaltyDate;
    private CustomerLoyaltyLevel loyaltyLevel;
    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;
}
