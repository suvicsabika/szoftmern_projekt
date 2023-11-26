package hu.szoftmern.project.testModel;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import hu.szoftmern.project.model.Freight;

import java.sql.Timestamp;

public class TestFreight {

    private Freight freight;

    @Before
    public void setUp() {
        Timestamp startTime = Timestamp.valueOf("2023-10-08 16:42:40.748");
        Timestamp arrivalTime = Timestamp.valueOf("2023-10-09 20:20:40.148");
        freight = new Freight(1L, 1L, 1L, "Ground", "Heaven", "Money",startTime,arrivalTime, 208.2);
    }

    @Test
    public void testGetFreightId() {
        assertEquals(1L, freight.getFreightId().longValue());
    }

    @Test
    public void testGetDriverId() {
        Long driverId = freight.getDriverId();
        assertNotNull(driverId);
        assertEquals(1L, driverId.longValue());
    }

    @Test
    public void testGetOrigin() {
        assertEquals("Ground", freight.getOrigin());
    }

    @Test
    public void testGetDestination() {
        assertEquals("Heaven", freight.getDestination());
    }

    @Test
    public void testGetCargo() {
        assertEquals("Money", freight.getCargo());
    }
    @Test
    public void testGetStartTime() {
        Timestamp expectedTimestamp = Timestamp.valueOf("2023-10-08 16:42:40.748");
        assertEquals(expectedTimestamp, freight.getStartTime());
    }
    @Test
    public void testGetArrivalTime() {
        Timestamp expectedTimestamp = Timestamp.valueOf("2023-10-09 20:20:40.148");
        assertEquals(expectedTimestamp, freight.getArrivalTime());
    }
}
