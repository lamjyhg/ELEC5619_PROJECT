package com.elec5619.backend.utils;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import java.io.IOException;

public interface EmailSendingHandler {
    public void send(String toEmail, String subject, String contentString) throws IOException;
}
