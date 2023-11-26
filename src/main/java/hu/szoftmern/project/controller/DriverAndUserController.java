// DriverAndUserController: Kezeli a sofőrökkel és felhasználókkal kapcsolatos kéréseket.

package hu.szoftmern.project.controller;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.User;
import hu.szoftmern.project.model.UserDriverRequest;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value="/driver")
public class DriverAndUserController {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    @Autowired
    public DriverAndUserController(DriverRepository driverRepository, UserRepository userRepository) {

        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
    }
    // getAllDrivers: Lekér és visszaadja az összes regisztrált sofőrt.
    @GetMapping(value = "/drivers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        if (drivers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(drivers);
    }

    // getOneDriverById: Lekér és visszaadja az adott azonosítójú sofőrt.
    @GetMapping(value = "/driverid:{driverId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Driver> getOneDriverById(@PathVariable Long driverId) {
        Optional<Driver> driver = driverRepository.findById(driverId);
        if (!driver.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(driver.get());
    }

    // getAllUsers: Lekér és visszaadja az összes regisztrált felhasználót.
    @GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    // getOneUserById: Lekér és visszaadja az adott azonosítójú felhasználót.
    @GetMapping(value = "/userid:{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getOneUserById(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userOptional.get());
    }

    // createDriver: Új sofőr és a hozzá tartozó felhasználó létrehozása.
    @PostMapping("/register")
    public ResponseEntity<String> createDriver(@RequestBody UserDriverRequest request) {
        try {
            User user = request.getUser();
            Driver driver = request.getDriver();

            if (user == null || driver == null) {
                return new ResponseEntity<>("Invalid user or driver data.", HttpStatus.BAD_REQUEST);
            }

            user.setDriver(driver);
            driver.setUser(user);

            userRepository.save(user);
            driverRepository.save(driver);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("The driver user has been created!", HttpStatus.CREATED);
    }

    // loginDriver: Bejelentkezési folyamat kezelése sofőrök számára.
    @PostMapping("/login/")
    public ResponseEntity<String> loginDriver(@RequestBody User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            return new ResponseEntity<>("Invalid login credentials.", HttpStatus.BAD_REQUEST);
        }

        String username = user.getUsername();
        String password = user.getPassword();

        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User storedUser = optionalUser.get();
            if (storedUser.checkPassword(password)) {
                return ResponseEntity.ok("Login successful");
            } else {
                return new ResponseEntity<>("Invalid login credentials.", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Invalid login credentials.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/isAdmin:{userId}-{isAdmin}")
    public ResponseEntity<String> updateisAdmin(@PathVariable Long userId, @PathVariable boolean isAdmin) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            return new ResponseEntity<>("Couldn't find user!", HttpStatus.BAD_REQUEST);
        }

        User foundUser = user.get();
        foundUser.setAdmin(isAdmin);
        userRepository.save(foundUser);

        return new ResponseEntity<>(String.format("User's isAdmin attribute changed from {%b} to {%b}!", !isAdmin, isAdmin), HttpStatus.OK);
    }

    // deleteDriver: Egy adott azonosítójú sofőr és a hozzá tartozó felhasználó törlése.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        if (!driverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        if (!driverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        driverRepository.deleteById(id);
        userRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
    // updateDriver: Egy adott azonosítójú sofőr és a hozzá tartozó felhasználó adatainak frissítése.
    @PutMapping("/{id}")
    public ResponseEntity<String> updateDriver(@PathVariable Long id, @RequestBody UserDriverRequest updatedDriver) {
        if (!driverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        try {
            User user = updatedDriver.getUser();
            Driver driver = updatedDriver.getDriver();

            user.setDriverId(id);
            driver.setDriverId(id);

            driverRepository.save(driver);
            userRepository.save(user);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Driver " + id + " is updated in the Driver and the User table too...", HttpStatus.CREATED);
    }
}