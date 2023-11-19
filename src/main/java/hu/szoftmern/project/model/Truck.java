package hu.szoftmern.project.model;

import jakarta.persistence.*;

@Entity
public class Truck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;
    @Column(name = "driver_id")
    private long driverId;
    private String brand;
    private String plateNumber;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    private double averageConsumption;

    public Truck() {
    }

    public Truck(Long vehicleId, long driverId, String brand, String plateNumber, FuelType fuelType, double averageConsumption) {
        this.vehicleId = vehicleId;
        this.driverId = driverId;
        this.brand = brand;
        this.plateNumber = plateNumber;
        this.fuelType = fuelType;
        this.averageConsumption = averageConsumption;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public long getDriverId() {
        return driverId;
    }

    public void setDriverId(long driverId) {
        this.driverId = driverId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public double getAverageConsumption() {
        return averageConsumption;
    }

    public void setAverageConsumption(double averageConsumption) {
        this.averageConsumption = averageConsumption;
    }

    @Override
    public String toString() {
        return "Truck{" +
                "vehicleId=" + vehicleId +
                ", driver=" + driverId +
                ", brand='" + brand + '\'' +
                ", plateNumber='" + plateNumber + '\'' +
                ", fuelType=" + fuelType +
                ", averageConsumption=" + averageConsumption +
                '}';
    }
}