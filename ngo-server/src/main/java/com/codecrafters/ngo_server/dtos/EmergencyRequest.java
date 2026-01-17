package com.codecrafters.ngo_server.dtos;

import lombok.Data;

@Data
public class EmergencyRequest {
    private double latitude;
    private double longitude;
    private String calamity;
}
