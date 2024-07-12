package com.example.springsecurity.repository;

import com.example.springsecurity.Domain.Role;
import com.example.springsecurity.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository  extends JpaRepository<Role,Long> {
    Role findByName(String name);

}
