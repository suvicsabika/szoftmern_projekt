package hu.szoftmern.project.repository;

import hu.szoftmern.project.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DriverRepository extends JpaRepository<Driver, Long> {
    //Driver findByDriverId(Long driverId);
}

