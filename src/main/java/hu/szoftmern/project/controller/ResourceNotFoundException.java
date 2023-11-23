package hu.szoftmern.project.controller;

// ResourceNotFoundException: Egyéni kivétel, amely akkor kerül felhasználásra, ha egy erőforrás nem található.
public class ResourceNotFoundException extends RuntimeException {

    // Konstruktor: Létrehoz egy új ResourceNotFoundException példányt egy adott erőforrás hiányára utalva.
    public ResourceNotFoundException(String driver, String driverId, Long driverId1) {
    }
}