package lk.ijse.gdse66.footflex.demo.embedded;
/*
    this application is copyright protected
    Author : kumara
    Date : 5/19/2024
*/
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailPK implements Serializable {

    private String order_id;
    private String item_code;
    private String size;
}