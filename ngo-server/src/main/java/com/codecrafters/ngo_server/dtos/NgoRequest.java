package com.codecrafters.ngo_server.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class NgoRequest {
    @NotBlank(message = "Name is required")
    private String name;
    @NotNull(message = "Latitude is required")
    private Double latitude;
    @NotNull(message = "Longitude is required")
    private Double longitude;
    @NotBlank(message = "Email is required")
    @Email(message = "The email field should match a valid email format")
    private String email;
    @Size(min = 8, max = 16, message = "Password must be 8-16 characters long")
    private String password;
    @NotNull(message = "Contact number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    private String contactNumber;
}

