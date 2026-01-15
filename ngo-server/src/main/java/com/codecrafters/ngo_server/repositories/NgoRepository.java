package com.codecrafters.ngo_server.repositories;

import com.codecrafters.ngo_server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NgoRepository extends JpaRepository<Ngo, UUID> {
    Optional<Ngo> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByContactNumber(String contactNumber);
}
