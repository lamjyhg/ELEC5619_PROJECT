package com.elec5619.backend.services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class EmailService {
    public void send(String toEmail, String subject, String html) throws IOException {
        Email from = new Email("lamjh1999@gmail.com");
        Email to = new Email(toEmail);
        Content content = new Content("text/html", html);
        Mail mail = new Mail(from,subject,to, content);

        SendGrid sendGrid = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            System.out.println(response.getStatusCode());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
