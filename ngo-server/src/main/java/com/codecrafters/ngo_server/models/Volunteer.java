package com.codecrafters.ngo_server.models;

import com.codecrafters.ngo_server.util.VolunteerStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "volunteers")
@Data
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String zone;

    @Column(nullable = false)
    private String expertise;

    @Column(nullable = false)
    private VolunteerStatus status;

    @Column(nullable = false, unique = true)
    private String contactNumber;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private Ngo ngo;
}
