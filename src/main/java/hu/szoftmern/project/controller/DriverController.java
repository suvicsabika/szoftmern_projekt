package hu.szoftmern.project.controller;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/driver")
public class DriverController {

    private final DriverRepository driverRepository;

    @Autowired
    public DriverController(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> Drivers = driverRepository.findAll();
        return ResponseEntity.ok(Drivers);
    }
    @GetMapping("/{driverId}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Long driverId) {
        Optional<Driver> optionalDriver = driverRepository.findById(driverId);

        return optionalDriver.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Driver> createDriver(@RequestBody Driver Driver) {
        Driver savedDriver = driverRepository.save(Driver);
        return new ResponseEntity<>(savedDriver, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        if (!driverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        driverRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long id, @RequestBody Driver updatedDriver) {
        if (!driverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        updatedDriver.setDriverId(id);
        Driver savedDriver = driverRepository.save(updatedDriver);

        return ResponseEntity.ok(savedDriver);
    }
}