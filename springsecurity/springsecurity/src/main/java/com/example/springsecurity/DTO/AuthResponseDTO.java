package com.example.springsecurity.DTO;

import lombok.Data;
import java.util.List;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer";
    private List<String> roles; // Add roles
    private Long userId;
    public AuthResponseDTO(String accessToken, List<String> roles, Long userId) {
        this.accessToken = accessToken;
        this.roles = roles;
        this.userId = userId;

    }
}
