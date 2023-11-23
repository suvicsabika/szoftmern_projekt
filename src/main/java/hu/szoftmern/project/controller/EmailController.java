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
    @PostMapping("/{driverId}")
    public ResponseEntity<String> sendEmail(@RequestBody @PathVariable Long driverId) {
        String driversEmail = String.valueOf(userRepository.getById(driverId).getEmail());

        emailService.sendEmail(driversEmail, null, null);
        return ResponseEntity.ok("Email sent successfully");
    }
}