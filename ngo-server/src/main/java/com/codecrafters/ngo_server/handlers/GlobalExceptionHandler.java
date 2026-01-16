package com.codecrafters.ngo_server.handlers;

import com.codecrafters.ngo_server.dtos.ErrorResponse;
import com.codecrafters.ngo_server.exceptions.NgoAlreadyExistsException;
import com.codecrafters.ngo_server.exceptions.NgoNotFoundException;
import com.codecrafters.ngo_server.exceptions.VolunteerAlreadyExistsException;
import com.codecrafters.ngo_server.exceptions.VolunteerNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NgoAlreadyExistsException.class)
    public ResponseEntity<?> handleNgoAlreadyExistsException(NgoAlreadyExistsException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NgoNotFoundException.class)
    public ResponseEntity<?> handleNgoNotFoundException(NgoNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(VolunteerAlreadyExistsException.class)
    public ResponseEntity<?> handleVolunteerAlreadyExistsException(VolunteerAlreadyExistsException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(VolunteerNotFoundException.class)
    public ResponseEntity<?> handleVolunteerNotFoundException(VolunteerNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
