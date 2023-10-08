package hu.szoftmern.project.service;

import hu.szoftmern.project.model.TruckDriver;
import hu.szoftmern.project.repository.TruckDriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TruckDriverService {
    private final TruckDriverRepository truckDriverRepository;

    @Autowired
    public TruckDriverService(TruckDriverRepository truckDriverRepository) {
        this.truckDriverRepository = truckDriverRepository;
    }

    public List<TruckDriver> getAllTruckDrivers() {
        return truckDriverRepository.findAll();
    }

    public TruckDriver saveTruckDriver(TruckDriver truckDriver) {
        return truckDriverRepository.save(truckDriver);
    }
}
