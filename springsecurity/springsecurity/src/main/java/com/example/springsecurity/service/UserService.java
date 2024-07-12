package com.example.springsecurity.service;

import com.example.springsecurity.Domain.Role;
import com.example.springsecurity.Domain.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);
Role saveRole(Role role);
void addRoleToUser(String username, String roleName);
User getUser(String username);
   User getUserById(Long id);

List<User>getUsers();


    User updateUser(Long id, User user);
    void deleteUser(Long id);

}
