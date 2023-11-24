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

import java.util.ArrayList;
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
    //DONE
    // getAllDrivers: Lekéri az összes sofőrt és a hozzájuk tartozó felhasználókat.
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserDriverRequest>> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        List<User> users = userRepository.findAll();
        List<UserDriverRequest> userDriverResponses = new ArrayList<>();

        for (int i = 0; i < users.size(); i++) {
            UserDriverRequest response = new UserDriverRequest();
            response.setUser(users.get(i));
            response.setDriver(drivers.get(i));

            userDriverResponses.add(response);
        }

        return ResponseEntity.ok(userDriverResponses);
    }
    //DONE
    // getDriverById: Egy adott azonosítójú sofőrt és a hozzá tartozó felhasználót adja vissza.
    @GetMapping("{driverId}")
    public ResponseEntity<UserDriverRequest> getDriverById(@PathVariable Long driverId) {
        Optional<Driver> optionalDriver = driverRepository.findById(driverId);

        if (optionalDriver.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Driver foundDriver = optionalDriver.get();
        Optional<User> foundUser = userRepository.findById(driverId);

        if (foundUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserDriverRequest result = new UserDriverRequest();
        result.setUser(foundUser.get());
        result.setDriver(foundDriver);

        return ResponseEntity.ok(result);
    }
    //DONE
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

    //DONE
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
    //DONE
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