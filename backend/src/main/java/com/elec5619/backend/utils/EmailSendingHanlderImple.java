package com.elec5619.backend.utils;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

public class EmailSendingHanlderImple implements EmailSendingHandler{

    @Value("${emailSender.from}")
    private String fromString;
    private final Email from = new Email(fromString);

    @Override
    public void send(String toEmail, String subject, String contentString) throws IOException {
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", contentString);
        System.out.println(String.format("%s %s %s %s",toEmail,from.getEmail(),contentString, subject));
        Mail mail = new Mail(from,subject,to, content);

        SendGrid sendGrid = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
