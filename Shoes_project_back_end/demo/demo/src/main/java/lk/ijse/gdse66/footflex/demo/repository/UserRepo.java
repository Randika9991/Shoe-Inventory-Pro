package lk.ijse.gdse66.footflex.demo.repository;/*
    this application is copyright protected
    Author : kumara
    Date : 5/22/2024
*/

import lk.ijse.gdse66.footflex.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String > {
    Optional<User> findByEmail(String email);

    User getAllByEmail(String email);
}
