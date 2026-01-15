package com.codecrafters.ngo_server.exceptions;

public class NgoNotFoundException extends RuntimeException {
  public NgoNotFoundException(String message) {
    super(message);
  }
}
