package hu.szoftmern.project.controller;

import hu.szoftmern.project.model.TruckDriver;
import hu.szoftmern.project.repository.TruckDriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/truckdrivers")
public class TruckDriverController {

    private final TruckDriverRepository truckDriverRepository;

    @Autowired
    public TruckDriverController(TruckDriverRepository truckDriverRepository) {
        this.truckDriverRepository = truckDriverRepository;
    }

    // ... Other endpoints
    @GetMapping("/")
    public ResponseEntity<List<TruckDriver>> getAllTruckDrivers() {
        List<TruckDriver> truckDrivers = truckDriverRepository.findAll();
        return ResponseEntity.ok(truckDrivers);
    }

    @PostMapping("/")
    public ResponseEntity<TruckDriver> createTruckDriver(@RequestBody TruckDriver truckDriver) {
        TruckDriver savedTruckDriver = truckDriverRepository.save(truckDriver);
        return new ResponseEntity<>(savedTruckDriver, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTruckDriver(@PathVariable Long id) {
        if (!truckDriverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        truckDriverRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TruckDriver> updateTruckDriver(@PathVariable Long id, @RequestBody TruckDriver updatedTruckDriver) {
        // Check if the truck driver with the given ID exists
        if (!truckDriverRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        updatedTruckDriver.setId(id);
        TruckDriver savedTruckDriver = truckDriverRepository.save(updatedTruckDriver);

        return ResponseEntity.ok(savedTruckDriver);
    }
}