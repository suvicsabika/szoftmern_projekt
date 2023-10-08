package hu.szoftmern.project.repository;

import hu.szoftmern.project.model.TruckDriver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TruckDriverRepository extends JpaRepository<TruckDriver, Long> {
    List<TruckDriver> findAll();
}

