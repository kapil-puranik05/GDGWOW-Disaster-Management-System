package com.codecrafters.ngo_server.repositories;

public interface MailSenderService {
    void sendTextMail(String to, String subject, String body);
}

