package hu.szoftmern.project.repository;

import hu.szoftmern.project.model.Freight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface FreightRepository extends JpaRepository<Freight, Long>{
    List<Freight> findByDriverId(Long driverId);

}
