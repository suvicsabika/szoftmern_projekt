package hu.szoftmern.project.testEmail;

import hu.szoftmern.project.service.EmailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestEmail {

    @Autowired
    private EmailService emailService;

    public TestEmail() {

    }

    @Test
    public void testSendEmail() {
        emailService.sendEmail("noreply.trucksystem@gmail.com", "test", "TEST!!!");
    }
}
