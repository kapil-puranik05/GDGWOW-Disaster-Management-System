package com.codecrafters.ngo_server.controllers;

import com.codecrafters.ngo_server.dtos.ClosestNgoRequest;
import com.codecrafters.ngo_server.dtos.NgoRequest;
import com.codecrafters.ngo_server.dtos.NgoUpdateRequest;
import com.codecrafters.ngo_server.services.NgoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/ngo")
@RequiredArgsConstructor
public class NgoController {
    private final NgoService ngoService;

    @PostMapping
    public ResponseEntity<?> registerNgo(@Valid @RequestBody NgoRequest ngoRequest) {
        return new ResponseEntity<>(ngoService.createNgo(ngoRequest), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateNgo(@Valid @RequestBody NgoUpdateRequest ngoUpdateRequest) {
        return new ResponseEntity<>(ngoService.updateNgoData(ngoUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNgo(@PathVariable UUID id) {
        ngoService.deleteNgo(id);
        return new ResponseEntity<>("Ngo data deleted successfully", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllNgos() {
        return new ResponseEntity<>(ngoService.getAllNgos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNgoById(@PathVariable UUID id) {
        return new ResponseEntity<>(ngoService.getNgo(id), HttpStatus.OK);
    }

    @GetMapping("/closest-ngos")
    public ResponseEntity<?> getClosestNgos(@RequestBody ClosestNgoRequest ngoRequest) {
        return new ResponseEntity<>(ngoService.getClosestNgos(ngoRequest), HttpStatus.OK);
    }
}
