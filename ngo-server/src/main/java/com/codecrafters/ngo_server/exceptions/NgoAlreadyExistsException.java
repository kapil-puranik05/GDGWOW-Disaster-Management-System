package com.codecrafters.ngo_server.exceptions;

public class NgoAlreadyExistsException extends RuntimeException {
    public NgoAlreadyExistsException(String message) {
        super(message);
    }
}
