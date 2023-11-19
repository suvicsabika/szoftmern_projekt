package hu.szoftmern.project.repository;

import hu.szoftmern.project.model.Truck;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TruckRepository extends JpaRepository<Truck, Long>{

}
