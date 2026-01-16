package com.codecrafters.ngo_server.repositories;

import com.codecrafters.ngo_server.models.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, UUID> {
    @Query(value = "SELECT * FROM volunteers WHERE ngo_id = :id", nativeQuery = true)
    List<Volunteer> getVolunteersByNgoId(@Param("id") UUID id);
    boolean existsByContactNumber(String contactNumber);
}
