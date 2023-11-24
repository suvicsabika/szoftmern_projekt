package hu.szoftmern.project.testDatabase;

import hu.szoftmern.project.model.Driver;
import hu.szoftmern.project.model.User;
import hu.szoftmern.project.model.Freight;
import hu.szoftmern.project.repository.DriverRepository;
import hu.szoftmern.project.repository.UserRepository;
import hu.szoftmern.project.repository.FreightRepository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;

@RunWith(SpringRunner.class)
@DataJpaTest(properties = "spring.config.location=classpath:/all.properties")
public class TestDatabase {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private FreightRepository freightRepository;
    @Test
    public void testUserEntityPersistence() {
        // Create a new User instance
        User user = new User();
        user.setUsername("testUsername");
        user.setEmail("test@example.com");
        user.setPassword("testPassword");

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Assertions to check if the user has been persisted properly
        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(savedUser.getDriverId()).isNotNull();
        Assertions.assertThat(savedUser.getDriverId()).isGreaterThan(0);

        // Additional assertions can be added to verify other fields
        Assertions.assertThat(savedUser.getUsername()).isEqualTo(user.getUsername());
        Assertions.assertThat(savedUser.getEmail()).isEqualTo(user.getEmail());

        // You might also want to test the 'toString' method or any business logic associated with the User entity
        System.out.println(savedUser.toString());
    }

    @Test
    void testDriverEntityPersistence() {
        // Create a new Driver instance
        Driver driver = new Driver();
        driver.setName("John Doe");
        driver.setPhoneNumber("1234567890");
        driver.setAddress("123 Main St");

        // Save the driver to the database
        Driver savedDriver = driverRepository.save(driver);

        // Assertions to check if the driver has been persisted properly
        Assertions.assertThat(savedDriver).isNotNull();
        Assertions.assertThat(savedDriver.getDriverId()).isNotNull();
        Assertions.assertThat(savedDriver.getDriverId()).isGreaterThan(0);

        // Additional assertions can be added to verify other fields
        Assertions.assertThat(savedDriver.getName()).isEqualTo(driver.getName());
        Assertions.assertThat(savedDriver.getPhoneNumber()).isEqualTo(driver.getPhoneNumber());
        Assertions.assertThat(savedDriver.getAddress()).isEqualTo(driver.getAddress());

        // You might also want to test the 'toString' method or any business logic associated with the Driver entity
        System.out.println(savedDriver.toString());
    }

    @Test
    void testFreightEntityPersistence() {
        // Create a new Freight instance with some test data
        Freight freight = new Freight();
        freight.setDriverId(1L); // Assuming a driver with ID 1 exists, otherwise, you need to create one
        freight.setOrigin("City A");
        freight.setDestination("City B");
        freight.setCargo("Electronics");
        freight.setStartTime(new Timestamp(System.currentTimeMillis()));
        freight.setArrivalTime(new Timestamp(System.currentTimeMillis() + 86400000)); // 1 day later

        // Save the freight to the database
        Freight savedFreight = freightRepository.save(freight);

        // Assertions to check if the freight has been persisted properly
        Assertions.assertThat(savedFreight).isNotNull();
        Assertions.assertThat(savedFreight.getFreightId()).isNotNull();
        Assertions.assertThat(savedFreight.getFreightId()).isGreaterThan(0);

        // Additional assertions can be added to verify other fields
        Assertions.assertThat(savedFreight.getDriverId()).isEqualTo(freight.getDriverId());
        Assertions.assertThat(savedFreight.getOrigin()).isEqualTo(freight.getOrigin());
        Assertions.assertThat(savedFreight.getDestination()).isEqualTo(freight.getDestination());
        Assertions.assertThat(savedFreight.getCargo()).isEqualTo(freight.getCargo());
        Assertions.assertThat(savedFreight.getStartTime()).isEqualTo(freight.getStartTime());
        Assertions.assertThat(savedFreight.getArrivalTime()).isEqualTo(freight.getArrivalTime());

        // You might also want to test the 'toString' method or any business logic associated with the Freight entity
        System.out.println(savedFreight.toString());
    }

}
