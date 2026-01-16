package com.codecrafters.ngo_server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.UUID;

@Data
public class VolunteerRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Zone is required")
    private String zone;
    @NotBlank(message = "Expertise is required")
    private String expertise;
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    private String contactNumber;
}
