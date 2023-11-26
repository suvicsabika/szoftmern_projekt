// EmailController: Kezeli az e-mail küldéssel kapcsolatos kéréseket.
package hu.szoftmern.project.controller;

import hu.szoftmern.project.repository.UserRepository;
import hu.szoftmern.project.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
    private EmailService emailService;
    private UserRepository userRepository;

    // Konstruktor: Inicializálja az EmailService-t és UserRepository-t.
    public EmailController(EmailService emailService, UserRepository userRepository) {
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    // sendEmail: E-mail küldése egy adott azonosítójú sofőrnek.
    @PostMapping("/id:{driver}subject:{subject}body:{body}")
    public ResponseEntity<String> sendEmail(@PathVariable String driver, @PathVariable String subject, @PathVariable String body) {
        //String driversEmail = String.valueOf(userRepository.getById(driverId).getEmail());
        System.out.println("STRING VAGYOK " + driver);
        emailService.sendCostumEmail(driver, subject, body);
        return ResponseEntity.ok("Email sent successfully");
    }

    @PostMapping("/weeklyid:{driverId}")
    public ResponseEntity<String> sendWeeklyScheduledEmailsTest(@PathVariable Long driverId) {
        String driversEmail = String.valueOf(userRepository.getById(driverId).getEmail());
        emailService.sendWeeklyEmail(driversEmail, "Weekly Freight Details", "Something");

        return ResponseEntity.ok("Email sent successfully");
    }
}