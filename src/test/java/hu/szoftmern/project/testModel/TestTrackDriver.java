//package hu.szoftmern.project.testModel;
//
//import org.junit.Test;
//import static org.junit.Assert.*;
//import hu.szoftmern.project.model.TruckDriver;
//
//import java.sql.Time;
//import java.sql.Timestamp;
//
//public class TestTrackDriver {
//
//
//    @Test
//    public void testCreateTruckDriver() {
//        TruckDriver truckDriver = new TruckDriver();
//
//        truckDriver.setFuvarKezdet(Timestamp.valueOf("2023-10-08 16:42:40.748"));
//        truckDriver.setFuvarVege(Timestamp.valueOf("2023-10-08 16:42:40.748"));
//        truckDriver.setFuvarIdo(Time.valueOf("01:30:00"));
//        truckDriver.setPihenoStop(Time.valueOf("00:30:00"));
//        truckDriver.setPihen(true);
//        truckDriver.setSzallitmany("Example Cargo");
//        truckDriver.setUticel("Destination");
//        truckDriver.setUticelCeg("Destination Company");
//
//        assertEquals(Timestamp.valueOf("2023-10-08 16:42:40.748"), truckDriver.getFuvarKezdet());
//        assertEquals(Timestamp.valueOf("2023-10-08 16:42:40.748"), truckDriver.getFuvarVege());
//        assertEquals(Time.valueOf("01:30:00"), truckDriver.getFuvarIdo());
//
//        assertEquals(Time.valueOf("00:30:00"), truckDriver.getPihenoStop());
//        assertEquals(true, truckDriver.getPihen());
//        assertEquals("Example Cargo", truckDriver.getSzallitmany());
//        assertEquals("Destination", truckDriver.getUticel());
//        assertEquals("Destination Company", truckDriver.getUticelCeg());
//
//        System.out.println("TestTruckDriver - OK!");
//    }
//}
