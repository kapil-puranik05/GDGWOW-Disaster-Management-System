package com.codecrafters.ngo_server.dtos;

import lombok.Data;

@Data
public class ClosestNgoRequest {
    private Double latitude;
    private Double longitude;
    private int n;
}
