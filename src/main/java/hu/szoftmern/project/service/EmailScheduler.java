package hu.szoftmern.project.service;

import hu.szoftmern.project.model.User;
import hu.szoftmern.project.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmailScheduler {

    private final EmailService emailService;
    private final UserRepository userRepository;
    private EmailService emailService1;

    public EmailScheduler(EmailService emailService, UserRepository userRepository) {
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 12 ? * SUN") // This cron expression triggers the method every Sunday at 12 PM
    public void sendWeeklyFreightEmails() {
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            if (user.getDriverId() != null) {
                emailService1.sendEmail(user.getEmail(), "Weekly Freight Details", "Something");
            }
        }
    }
}
