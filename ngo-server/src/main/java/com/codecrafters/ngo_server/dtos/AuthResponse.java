package com.codecrafters.ngo_server.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class AuthResponse {
    private String token;
    private UUID ngoId;
}
