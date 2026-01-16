package com.codecrafters.ngo_server.controllers;

import com.codecrafters.ngo_server.dtos.LoginRequest;
import com.codecrafters.ngo_server.dtos.NgoRequest;
import com.codecrafters.ngo_server.repositories.NgoRepository;
import com.codecrafters.ngo_server.services.NgoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {
    private final NgoService ngoService;

    @GetMapping("/health-check")
    public ResponseEntity<?> healthCheck() {
        return new ResponseEntity<>("Server is running", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerNgo(@Valid @RequestBody NgoRequest ngoRequest) {
        return new ResponseEntity<>(ngoService.createNgo(ngoRequest), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(ngoService.login(loginRequest), HttpStatus.OK);
    }
}
