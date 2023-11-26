package hu.szoftmern.project.testEmail;

import hu.szoftmern.project.service.EmailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;

import javax.mail.Session;
import java.util.Properties;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class TestEmail {

    @Autowired
    private EmailService emailService;

    //@MockBean
    private JavaMailSender javaMailSender; // Mock JavaMailSender

    @Test
    public void testWeeklySendEmail() {
        emailService.sendWeeklyEmail("noreply.trucksystem@gmail.com", null, null);
    }
}
