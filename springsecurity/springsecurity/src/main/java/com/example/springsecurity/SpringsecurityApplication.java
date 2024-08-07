package com.example.springsecurity;

import com.example.springsecurity.Domain.Role;
import com.example.springsecurity.Domain.User;
import com.example.springsecurity.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication

public class SpringsecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringsecurityApplication.class, args);
	}

	@Bean
	CommandLineRunner run (UserService userService) {
	return args -> {



	};
}


}