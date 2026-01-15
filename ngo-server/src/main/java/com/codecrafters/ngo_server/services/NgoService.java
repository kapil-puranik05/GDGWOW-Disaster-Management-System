package com.codecrafters.ngo_server.services;

import com.codecrafters.ngo_server.dtos.ClosestNgoRequest;
import com.codecrafters.ngo_server.dtos.NgoRequest;
import com.codecrafters.ngo_server.dtos.NgoUpdateRequest;
import com.codecrafters.ngo_server.exceptions.NgoAlreadyExistsException;
import com.codecrafters.ngo_server.exceptions.NgoNotFoundException;
import com.codecrafters.ngo_server.models.Ngo;
import com.codecrafters.ngo_server.repositories.NgoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NgoService {
    private final NgoRepository ngoRepository;

    //Need to figure out how we're supposed to validate latitude and longitude
    @Transactional
    public synchronized Ngo createNgo(NgoRequest ngoRequest) {
        if(ngoRepository.existsByEmail(ngoRequest.getEmail()) || ngoRepository.existsByContactNumber(ngoRequest.getContactNumber())) {
            throw new NgoAlreadyExistsException("Ngo with given email or contact number already exists");
        }
        Ngo ngo = new Ngo();
        ngo.setName(ngoRequest.getName());
        ngo.setLongitude(ngoRequest.getLongitude());
        ngo.setLatitude(ngoRequest.getLatitude());
        ngo.setContactNumber(ngoRequest.getContactNumber());
        ngo.setEmail(ngoRequest.getEmail());
        return ngoRepository.save(ngo);
    }

    public Ngo getNgo(UUID id) {
        return ngoRepository.findById(id).orElseThrow(() -> new NgoNotFoundException("Ngo with given id does not exist"));
    }

    public List<Ngo> getAllNgos() {
        return ngoRepository.findAll();
    }

    @Transactional
    public synchronized Ngo updateNgoData(NgoUpdateRequest ngoUpdateRequest) {
        Ngo ngo = ngoRepository.findByEmail(ngoUpdateRequest.getEmail()).orElseThrow(() -> new NgoNotFoundException("Ngo with given email does not exist"));
        ngo.setEmail((ngoUpdateRequest.getEmail() != null) ? ngoUpdateRequest.getEmail() : ngo.getEmail());
        ngo.setName((ngoUpdateRequest.getName() != null) ? ngoUpdateRequest.getName() : ngo.getName());
        ngo.setLongitude((ngoUpdateRequest.getLongitude() != null) ? ngoUpdateRequest.getLongitude() : ngo.getLongitude());
        ngo.setLatitude((ngoUpdateRequest.getLatitude() != null) ? ngoUpdateRequest.getLatitude() : ngo.getLatitude());
        ngo.setContactNumber((ngoUpdateRequest.getContactNumber() != null) ? ngoUpdateRequest.getContactNumber() : ngo.getContactNumber());
        return ngoRepository.save(ngo);
    }

    public void deleteNgo(UUID id) {
        if(!ngoRepository.existsById(id)) {
            throw new NgoNotFoundException("Ngo with given id does not exist");
        }
        ngoRepository.deleteById(id);
    }

    public List<Ngo> getClosestNgos(ClosestNgoRequest ngoRequest) {
        List<Ngo> ngos = ngoRepository.findAll();
        ngos.sort(Comparator.comparingDouble(ngo -> haversineDistance(ngoRequest.getLongitude(), ngoRequest.getLatitude(), ngo.getLongitude(), ngo.getLatitude())));
        return ngos.size() > ngoRequest.getN() ? ngos.stream().limit(ngoRequest.getN()).toList() : ngos;
    }

    public double haversineDistance(double lon1, double lat1, double lon2, double lat2) {
        double toRad = Math.PI / 180;
        double R = 6371;
        double dLat = (lat2 - lat1) * toRad;
        double dLon = (lon2 - lon1) * toRad;
        double radLat1 = lat1 * toRad;
        double radLat2 = lat2 * toRad;
        double a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(radLat1) * Math.cos(radLat2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
