package hu.szoftmern.project.controller;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.Freight;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.FreightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/freight")
public class FreightController {

    private final FreightRepository freightRepository;
    private final DriverRepository driverRepository;

    @Autowired
    public FreightController(FreightRepository freightRepository, DriverRepository driverRepository) {
        this.freightRepository = freightRepository;
        this.driverRepository = driverRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Freight>> getAllFreights() {
        List<Freight> freights = freightRepository.findAll();
        return ResponseEntity.ok(freights);
    }

    @GetMapping("/{freightId}")
    public ResponseEntity<Freight> getFreightById(@PathVariable Long freightId) {
        Optional<Freight> optionalFreight = freightRepository.findById(freightId);

        return optionalFreight.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/by-driver/{driverId}")
    public ResponseEntity<List<Freight>> getFreightsByDriver(@PathVariable Long driverId) {
        List<Freight> freights = freightRepository.findByDriverId(driverId);
        return ResponseEntity.ok(freights);
    }



    @PostMapping("/")
    public ResponseEntity<Freight> createFreight(@RequestBody Freight freight) {
        Long driverId = freight.getDriverId();
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver", "driverId", driverId));

        freight.setDriverId(driverId);

        Freight savedFreight = freightRepository.save(freight);
        return new ResponseEntity<>(savedFreight, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFreight(@PathVariable Long id) {
        if (!freightRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        freightRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Freight> updateFreight(@PathVariable Long id, @RequestBody Freight updatedFreight) {
        if (!freightRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        updatedFreight.setFreightId(id);
        Freight savedFreight = freightRepository.save(updatedFreight);

        return ResponseEntity.ok(savedFreight);
    }
}