package com.codecrafters.ngo_server.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class NgoUpdateRequest {
    private String name;
    private Double latitude;
    private Double longitude;
    @NotBlank(message = "Email is required")
    @Email(message = "The email field should match a valid email format")
    private String email;
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid mobile number")
    private String contactNumber;
}
