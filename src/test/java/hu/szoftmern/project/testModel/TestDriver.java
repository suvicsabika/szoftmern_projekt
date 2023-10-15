package hu.szoftmern.project.testModel;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import hu.szoftmern.project.model.Driver;

public class TestDriver {

    private Driver driver;

    @Before
    public void setUp() {
        driver = new Driver(1L, "John Doe", "123-456-7890", "123 Main Street");
    }

    @Test
    public void testGetDriverId() {
        assertEquals(1L, driver.getDriverId().longValue());
    }

    @Test
    public void testGetName() {
        assertEquals("John Doe", driver.getName());
    }

    @Test
    public void testGetPhoneNumber() {
        assertEquals("123-456-7890", driver.getPhoneNumber());
    }

    @Test
    public void testGetAddress() {
        assertEquals("123 Main Street", driver.getAddress());
    }
}
