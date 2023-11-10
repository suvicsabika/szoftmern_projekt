package hu.szoftmern.project.repository;

import hu.szoftmern.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
