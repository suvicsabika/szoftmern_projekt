package hu.szoftmern.project.service;

import hu.szoftmern.project.model.Freight;
import hu.szoftmern.project.repository.FreightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreightService {
    private final FreightRepository freightRepository;

    @Autowired
    public FreightService(FreightRepository freightRepository) {
        this.freightRepository = freightRepository;
    }

    public List<Freight> getAllFreights() {
        return freightRepository.findAll();
    }

    public Freight saveFreight(Freight freight) {
        return freightRepository.save(freight);
    }

    public List<Freight> getFreightsByDriverId(Long driverId) {
        return freightRepository.findByDriverId(driverId);
    }
}
