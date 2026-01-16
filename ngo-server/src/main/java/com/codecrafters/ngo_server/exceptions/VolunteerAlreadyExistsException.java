package com.codecrafters.ngo_server.exceptions;

public class VolunteerAlreadyExistsException extends RuntimeException {
    public VolunteerAlreadyExistsException(String message) {
        super(message);
    }
}
