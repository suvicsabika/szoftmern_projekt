package hu.szoftmern.project.testDatabase;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.User;
import hu.szoftmern.project.model.Freight;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.UserRepository;
import hu.szoftmern.project.repository.FreightRepository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.sql.Timestamp;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class TestDatabase {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private FreightRepository freightRepository;

    @Test
    void testUserEntityPersistence() {
        User user = new User();
        user.setUsername("testUsername");
        user.setEmail("test@example.com");
        user.setPassword("testPassword");

        User savedUser = userRepository.save(user);

        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getDriverId()).isNotNull();
        Assertions.assertThat(savedUser.getDriverId()).isGreaterThan(0);

        Assertions.assertThat(savedUser.getUsername()).isEqualTo(user.getUsername());
        Assertions.assertThat(savedUser.getEmail()).isEqualTo(user.getEmail());

        System.out.println(savedUser.toString());
    }

    @Test
    void testDriverEntityPersistence() {
        Driver driver = new Driver();
        driver.setName("John Doe");
        driver.setPhoneNumber("1234567890");
        driver.setAddress("123 Main St");


        Driver savedDriver = driverRepository.save(driver);


        Assertions.assertThat(savedDriver).isNotNull();
        Assertions.assertThat(savedDriver.getDriverId()).isNotNull();
        Assertions.assertThat(savedDriver.getDriverId()).isGreaterThan(0);


        Assertions.assertThat(savedDriver.getName()).isEqualTo(driver.getName());
        Assertions.assertThat(savedDriver.getPhoneNumber()).isEqualTo(driver.getPhoneNumber());
        Assertions.assertThat(savedDriver.getAddress()).isEqualTo(driver.getAddress());


        System.out.println(savedDriver.toString());
    }

    @Test
    void testFreightEntityPersistence() {
        Freight freight = new Freight();
        freight.setDriverId(1L);
        freight.setOrigin("City A");
        freight.setDestination("City B");
        freight.setCargo("Electronics");
        freight.setStartTime(new Timestamp(System.currentTimeMillis()));
        freight.setArrivalTime(new Timestamp(System.currentTimeMillis() + 86400000)); // 1 day later


        Freight savedFreight = freightRepository.save(freight);


        Assertions.assertThat(savedFreight).isNotNull();
        Assertions.assertThat(savedFreight.getFreightId()).isNotNull();
        Assertions.assertThat(savedFreight.getFreightId()).isGreaterThan(0);

        Assertions.assertThat(savedFreight.getDriverId()).isEqualTo(freight.getDriverId());
        Assertions.assertThat(savedFreight.getOrigin()).isEqualTo(freight.getOrigin());
        Assertions.assertThat(savedFreight.getDestination()).isEqualTo(freight.getDestination());
        Assertions.assertThat(savedFreight.getCargo()).isEqualTo(freight.getCargo());
        Assertions.assertThat(savedFreight.getStartTime()).isEqualTo(freight.getStartTime());
        Assertions.assertThat(savedFreight.getArrivalTime()).isEqualTo(freight.getArrivalTime());

        System.out.println(savedFreight.toString());
    }

}
