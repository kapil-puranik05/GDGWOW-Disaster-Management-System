package com.codecrafters.ngo_server.services;

import com.codecrafters.ngo_server.exceptions.NgoNotFoundException;
import com.codecrafters.ngo_server.models.Ngo;
import com.codecrafters.ngo_server.repositories.NgoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class NgoDetailsService implements UserDetailsService {
    private final NgoRepository ngoRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws NgoNotFoundException {
        Ngo ngo = ngoRepository.findByEmail(email).orElseThrow(() -> new NgoNotFoundException("Ngo with provided email not found"));
        return User.builder()
                .username(ngo.getEmail())
                .password(ngo.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }
}
