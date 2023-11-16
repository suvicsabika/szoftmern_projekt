package hu.szoftmern.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    private static final String myEmail = "noreply.trucksystem@gmail.com";

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom(myEmail);
        message.setReplyTo(myEmail);

        javaMailSender.send(message);

        System.out.println("Email Sent Successfully!!");
    }
}