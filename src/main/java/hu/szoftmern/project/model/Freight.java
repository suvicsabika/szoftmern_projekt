package hu.szoftmern.project.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Freight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long freightId;
    @Column(name = "driver_id")
    private Long driverId;
    private String origin;
    private String destination;
    private String cargo;
    private Timestamp startTime;
    private Timestamp arrivalTime;

//    @ManyToOne
//    @JoinColumn(name = "driver_id")
//    private Driver driver;

    public Freight() {
    }

    public Freight(Long freightId, Long driverId, String origin, String destination, String cargo, Timestamp startTime, Timestamp arrivalTime) {
        this.freightId = freightId;
        //this.driverId = driverId;
        this.origin = origin;
        this.destination = destination;
        this.cargo = cargo;
        this.startTime = startTime;
        this.arrivalTime = arrivalTime;
    }

    public Long getFreightId() {
        return freightId;
    }

    public void setFreightId(Long freightId) {
        this.freightId = freightId;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Timestamp arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

//    public Driver getDriver() {
//        return driver;
//    }
//
//    public void setDriver(Driver driver) {
//        this.driver = driver;
//    }

    @Override
    public String toString() {
        return "Freight{" +
                "freightId=" + freightId +
                " driverId= " + driverId +
                //" driver=" + driver +
                ", origin='" + origin + '\'' +
                ", destination='" + destination + '\'' +
                ", cargo='" + cargo + '\'' +
                ", startTime=" + startTime +
                ", arrivalTime=" + arrivalTime +
                '}';
    }
}
