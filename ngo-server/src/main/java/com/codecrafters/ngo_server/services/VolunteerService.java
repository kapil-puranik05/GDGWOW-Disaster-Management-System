package com.codecrafters.ngo_server.services;

import com.codecrafters.ngo_server.dtos.VolunteerRequest;
import com.codecrafters.ngo_server.exceptions.NgoNotFoundException;
import com.codecrafters.ngo_server.exceptions.VolunteerAlreadyExistsException;
import com.codecrafters.ngo_server.exceptions.VolunteerNotFoundException;
import com.codecrafters.ngo_server.models.Volunteer;
import com.codecrafters.ngo_server.repositories.NgoRepository;
import com.codecrafters.ngo_server.repositories.VolunteerRepository;
import com.codecrafters.ngo_server.util.VolunteerStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VolunteerService {
    private final VolunteerRepository volunteerRepository;
    private final NgoRepository ngoRepository;

    @Transactional
    public Volunteer createVolunteer(VolunteerRequest volunteerRequest, UUID ngoId) {
        if(volunteerRepository.existsByContactNumber(volunteerRequest.getContactNumber())) {
            throw new VolunteerAlreadyExistsException("A volunteer with provided contact number already exists");
        }
        Volunteer volunteer = new Volunteer();
        volunteer.setName(volunteerRequest.getName());
        volunteer.setExpertise(volunteerRequest.getExpertise());
        volunteer.setStatus(VolunteerStatus.AVAILABLE);
        volunteer.setContactNumber(volunteerRequest.getContactNumber());
        volunteer.setZone(volunteerRequest.getZone());
        ngoRepository.getReferenceById(ngoId).addVolunteer(volunteer);
        return volunteerRepository.save(volunteer);
    }

    public List<Volunteer> getAllVolunteers(UUID ngoId) {
        if(!ngoRepository.existsById(ngoId)) {
            throw new NgoNotFoundException("Ngo with provided id does not exist");
        }
        return volunteerRepository.getVolunteersByNgoId(ngoId);
    }

    public void deleteVolunteer(UUID ngoId) {
        if(!volunteerRepository.existsById(ngoId)) {
            throw new VolunteerNotFoundException("Volunteer with provided id does not exist");
        }
        volunteerRepository.deleteById(ngoId);
    }
}
