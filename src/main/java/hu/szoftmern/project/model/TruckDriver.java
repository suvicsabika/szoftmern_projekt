package hu.szoftmern.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Timestamp;
import java.sql.Time;

@Entity
public class TruckDriver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Timestamp fuvarKezdet;
    private Timestamp fuvarVege;
    private Time fuvarIdo;
    private Time pihenoStop;
    private Boolean pihen;
    private String szallitmany;
    private String uticel;

    public TruckDriver(Timestamp fuvarKezdet, Timestamp fuvarVege, Time fuvarIdo, Time pihenoStop, Boolean pihen, String szallitmany, String uticel, String uticelCeg) {
        this.fuvarKezdet = fuvarKezdet;
        this.fuvarVege = fuvarVege;
        this.fuvarIdo = fuvarIdo;
        this.pihenoStop = pihenoStop;
        this.pihen = pihen;
        this.szallitmany = szallitmany;
        this.uticel = uticel;
        this.uticelCeg = uticelCeg;
    }

    public TruckDriver() {
    }

    public Long getId() {
        return id;
    }

    public Timestamp getFuvarKezdet() {
        return fuvarKezdet;
    }

    public void setFuvarKezdet(Timestamp fuvarKezdet) {
        this.fuvarKezdet = fuvarKezdet;
    }

    public Timestamp getFuvarVege() {
        return fuvarVege;
    }

    public void setFuvarVege(Timestamp fuvarVege) {
        this.fuvarVege = fuvarVege;
    }

    public Time getFuvarIdo() {
        return fuvarIdo;
    }

    public void setFuvarIdo(Time fuvarIdo) {
        this.fuvarIdo = fuvarIdo;
    }

    public Time getPihenoStop() {
        return pihenoStop;
    }

    public void setPihenoStop(Time pihenoStop) {
        this.pihenoStop = pihenoStop;
    }

    public Boolean getPihen() {
        return pihen;
    }

    public void setPihen(Boolean pihen) {
        this.pihen = pihen;
    }

    public String getSzallitmany() {
        return szallitmany;
    }

    public void setSzallitmany(String szallitmany) {
        this.szallitmany = szallitmany;
    }

    public String getUticel() {
        return uticel;
    }

    public void setUticel(String uticel) {
        this.uticel = uticel;
    }

    public String getUticelCeg() {
        return uticelCeg;
    }

    public void setUticelCeg(String uticelCeg) {
        this.uticelCeg = uticelCeg;
    }

    private String uticelCeg;

    public void setId(Long id) {
        this.id = id;
    }
}
