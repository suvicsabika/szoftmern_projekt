/**
 * Az e-mail küldési funkciókat kezeli a Spring alkalmazásban.
 * Az osztály @Service annotációval rendelkezik, ami azt jelenti, hogy ez egy Spring service komponens,
 * és @PropertySource annotációval rendelkezik az email.properties fájl beolvasásához
*/

package hu.szoftmern.project.service;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.Freight;
import hu.szoftmern.project.model.User;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.FreightRepository;
import hu.szoftmern.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// EmailService: E-mail küldési szolgáltatásokat nyújtó osztály.
@Service
public class EmailService {
    private JavaMailSender javaMailSender;
    private static final String myEmail = "noreply.trucksystem@gmail.com";
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final FreightRepository freightRepository;

    private static String customBody = """
            Hello {name},
            
            This is to inform you about a new freight assignment. Details are as follows:
            {details}
            Please be prepared and ensure that you are ready for the upcoming assignment.
            Best regards,
            TruckSystem
                        
            """;

    // Konstruktor: Inicializálja a JavaMailSender-t.
    @Autowired
    public EmailService(JavaMailSender javaMailSender, UserRepository userRepository, DriverRepository driverRepository, FreightRepository freightRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
        this.freightRepository = freightRepository;
    }

    // sendEmail: Elküld egy e-mailt a megadott címzettnek.
    public void sendWeeklyEmail(String to, String customSubject, String customParamBody) {
        Optional<User> user = userRepository.findByEmail(to);
        Optional<Driver> driver = null;
        System.out.println(user);
        if (user.isPresent()) {
            driver = driverRepository.findById(user.get().getDriverId());
        }
        System.out.println(driver);
        if (driver != null && driver.isPresent()) {
            Driver actualDriver = driver.get();
            List<Freight> actualFreights = freightRepository.findByDriverId(driver.get().getDriverId());

            StringBuilder freightDetails = new StringBuilder();

            for (Freight freight : actualFreights) {
                System.out.println(freight);

                // Convert the Timestamp to LocalDateTime
                LocalDateTime timestampDateTime = freight.getStartTime().toLocalDateTime();

                // Get the current date
                LocalDate currentDate = LocalDate.now();
                if (timestampDateTime.toLocalDate().isBefore(currentDate)) {
                    continue;
                }
                freightDetails.append("Freight ID: ").append(freight.getFreightId()).append("\n");
                freightDetails.append("Cargo: ").append(freight.getCargo()).append("\n");
                freightDetails.append("Origin: ").append(freight.getOrigin()).append("\n");
                freightDetails.append("Destination: ").append(freight.getDestination()).append("\n");
                freightDetails.append("Start Time: ").append(freight.getStartTime()).append("\n");
                freightDetails.append("Arrival Time: ").append(freight.getArrivalTime()).append("\n\n");

            }

            customBody = customBody.replace("{name}", actualDriver.getName())
                    .replace("{event}", "Freight Details")
                    .replace("{date}", "")
                    .replace("{details}", freightDetails.toString());
        } else {
            System.out.println("Couldn't find the Driver!");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(customSubject);
        message.setText(customBody);

        message.setFrom(myEmail);
        message.setReplyTo(myEmail);

        javaMailSender.send(message);

        System.out.println("Email Sent Successfully!!");
    }

    public void sendCostumEmail(String to, String subject, String body) {
        Optional<User> user = userRepository.findByEmail(to);
        Optional<Driver> driver = null;
        System.out.println(user);
        if (user.isPresent()) {
            driver = driverRepository.findById(user.get().getDriverId());
        }
        System.out.println(driver);
        if (driver != null && driver.isPresent()) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            message.setFrom(myEmail);
            message.setReplyTo(myEmail);

            javaMailSender.send(message);

            System.out.println("Email Sent Successfully!!");
        } else {
            System.out.println("Couldn't find the Driver!");
        }
    }
}
