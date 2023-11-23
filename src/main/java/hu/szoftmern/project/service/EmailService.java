/**
 * Az e-mail küldési funkciókat kezeli a Spring alkalmazásban.
 * Az osztály @Service annotációval rendelkezik, ami azt jelenti, hogy ez egy Spring service komponens,
 * és @PropertySource annotációval rendelkezik az email.properties fájl beolvasásához
*/

package hu.szoftmern.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
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

// EmailService: E-mail küldési szolgáltatásokat nyújtó osztály.
@Service
@PropertySource("classpath:/email.properties")
public class EmailService {
    private JavaMailSender javaMailSender;
    private static final String myEmail = "noreply.trucksystem@gmail.com";

    @Value("${email.subject}")
    private String emailSubject;

    @Value("${email.body}")
    private String emailBodyTemplate;

    // Konstruktor: Inicializálja a JavaMailSender-t.
    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    // sendEmail: Elküld egy e-mailt a megadott címzettnek.
    public void sendEmail(String to, String customSubject, String customBody) {
        // New:
        String templateBody = emailBodyTemplate
                .replace("{name}", "customName")
                .replace("{event}", "customEvent")
                .replace("{date}", "customDate");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        if (customSubject == null) {
            message.setSubject(emailSubject);
        }
        else {
            message.setSubject(customSubject);
        }

        if (customBody == null) {
            message.setText(templateBody);
        }
        else {
            message.setText(customBody);
        }

        message.setFrom(myEmail);
        message.setReplyTo(myEmail);

        javaMailSender.send(message);

        System.out.println("Email Sent Successfully!!");
    }
}
