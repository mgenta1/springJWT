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
		userService.saveRole(new Role(null, "ROLE_USER"));
		userService.saveRole(new Role(null, "ROLE_ADMIN"));

		userService.saveUser(new User(null, "walid", "walid", "$2a$12$5Gf.fiOcAxyam6BP1LHyRuy3k1G4fS5zByLRo1r5vYECGpG3vDMbC", new ArrayList<>()));
		userService.saveUser(new User(null, "ahmed", "ahmed", "$2a$12$5Gf.fiOcAxyam6BP1LHyRuy3k1G4fS5zByLRo1r5vYECGpG3vDMbC", new ArrayList<>()));
		userService.saveUser(new User(null, "ali", "ali", "$2a$12$5Gf.fiOcAxyam6BP1LHyRuy3k1G4fS5zByLRo1r5vYECGpG3vDMbC", new ArrayList<>()));

		userService.addRoleToUser("walid", "ROLE_USER");

		userService.addRoleToUser("ahmed", "ROLE_ADMIN");

		userService.addRoleToUser("ali", "ROLE_ADMIN");
		userService.addRoleToUser("ali", "ROLE_USER");

	};
}


}