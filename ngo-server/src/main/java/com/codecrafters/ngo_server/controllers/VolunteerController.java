package com.codecrafters.ngo_server.controllers;

import com.codecrafters.ngo_server.dtos.VolunteerRequest;
import com.codecrafters.ngo_server.services.VolunteerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/volunteers")
@RequiredArgsConstructor
public class VolunteerController {
    private final VolunteerService volunteerService;

    @PostMapping("/{ngoId}")
    public ResponseEntity<?> createVolunteer(@Valid @RequestBody VolunteerRequest volunteerRequest, @PathVariable UUID ngoId) {
        return new ResponseEntity<>(volunteerService.createVolunteer(volunteerRequest, ngoId), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVolunteer(@PathVariable UUID id) {
        volunteerService.deleteVolunteer(id);
        return new ResponseEntity<>("Volunteer deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/{ngoId}")
    public ResponseEntity<?> getVolunteers(@PathVariable UUID ngoId) {
        return new ResponseEntity<>(volunteerService.getAllVolunteers(ngoId), HttpStatus.OK);
    }
}
