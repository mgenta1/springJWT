package com.example.springsecurity.service;

import com.example.springsecurity.Domain.Role;
import com.example.springsecurity.Domain.User;
import com.example.springsecurity.repository.RoleRepository;
import com.example.springsecurity.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImplement implements UserService{
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    @Override
    public User saveUser(User user) {

        log.info("Saving new user {} to the database", user.getName());
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());

        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Saving  role {} to user {}", roleName, username);

        User user = userRepo.findByUsername(username);
    Role role = roleRepo.findByName(roleName);
    user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("fetching user {} from the database", username);

        return userRepo.findByUsername(username);

    }

    @Override
    public List<User> getUsers() {
        log.info("fetching all users from the database");
        return userRepo.findAll();
    }


    @Override
    public User getUserById(Long id) { // Add this method
        return userRepo.findById(id).orElse(null);
    }
    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(user.getName());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setRoles(user.getRoles());
        return userRepo.save(existingUser);
    }
    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

}
