package lk.ijse.gdse.shoe_shop_managment.app;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.ui.ModelMap;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class AppApplication {

    public AppApplication() throws IOException {
	}

    public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	public ModelMapper mapper(){
		return new ModelMapper();
	}




}
