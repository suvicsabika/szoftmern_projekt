package hu.szoftmern.project.controller;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.Truck;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.TruckRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/truck")
@CrossOrigin(origins = "http://localhost:3000")
public class TruckController {
    private final TruckRepository truckRepository;

    private final DriverRepository driverRepository;
    public TruckController(TruckRepository truckRepository, DriverRepository driverRepository) {
        this.truckRepository = truckRepository;
        this.driverRepository = driverRepository;
    }

    @GetMapping
    public List<Truck> getAllTrucks() {
        return truckRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Truck> getTruckById(@PathVariable Long id) {
        return truckRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Truck> createTruck(@RequestBody Truck truck) {
        Long driverId = truck.getDriverId();
        Driver driver = driverRepository.findById(driverId)
                //Own Exception class
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "driverId", driverId));

        truck.setDriverId(driverId);

        Truck savedTruck = truckRepository.save(truck);
        return ResponseEntity.ok(savedTruck);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Truck> updateTruck(@PathVariable Long id, @RequestBody Truck updatedTruck) {
        return truckRepository.findById(id)
                .map(existingTruck -> {
                    // Update only the fields that should be modified
                    existingTruck.setBrand(updatedTruck.getBrand());
                    existingTruck.setPlateNumber(updatedTruck.getPlateNumber());
                    existingTruck.setFuelType(updatedTruck.getFuelType());
                    existingTruck.setAverageConsumption(updatedTruck.getAverageConsumption());

                    // Save the updated Truck entity
                    Truck savedTruck = truckRepository.save(existingTruck);
                    return ResponseEntity.ok(savedTruck);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTruck(@PathVariable Long id) {
        return truckRepository.findById(id)
                .map(existingTruck -> {
                    truckRepository.delete(existingTruck);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
