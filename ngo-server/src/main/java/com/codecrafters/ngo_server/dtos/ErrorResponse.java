package com.codecrafters.ngo_server.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ErrorResponse {
    private String message;
    private LocalDateTime timestamp;
}
