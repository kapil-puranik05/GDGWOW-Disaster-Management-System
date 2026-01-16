package com.codecrafters.ngo_server.dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
