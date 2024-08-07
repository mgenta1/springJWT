package com.example.springsecurity.DTO;

import lombok.Data;

@Data
public class RegisterDto {
    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;
}