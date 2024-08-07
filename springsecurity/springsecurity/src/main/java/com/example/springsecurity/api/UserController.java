package com.example.springsecurity.api;

import com.example.springsecurity.Domain.Role;
import com.example.springsecurity.Domain.User;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController @RequiredArgsConstructor @RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private UserRepository userRepository;

    @PostMapping("/users")
   // @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<User>> fetchUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }


    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }
    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());

        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }
    @PostMapping("/role/affect")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());

        return ResponseEntity.ok().build();
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> fetchRoles() {
        return ResponseEntity.ok(userService.getRoles());
    }

    @PostMapping("/user/{id}")
  //  @PreAuthorize("hasRole('ROLE_USER') ")

    public ResponseEntity<User> fetchUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @PutMapping("/user/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user/deactivate/{id}")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }
}
@Data
class RoleToUserForm {
    private String username;
    private String roleName;
}
