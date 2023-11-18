package hu.szoftmern.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    private static final String myEmail = "noreply.trucksystem@gmail.com";

    @Value("${email.subject}")
    private String emailSubject;

    @Value("${email.body}")
    private String emailBodyTemplate;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String customSubject, String customBody) {
        // New:
        String templateBody = emailBodyTemplate
                .replace("{name}", "customName")
                .replace("{event}", "customEvent")
                .replace("{date}", "customDate");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(emailSubject);
        message.setText(templateBody);
        message.setFrom(myEmail);
        message.setReplyTo(myEmail);

        // Modified: Use the javaMailSender field instead of the parameter
        javaMailSender.send(message);

        System.out.println("Email Sent Successfully!!");
    }
}
