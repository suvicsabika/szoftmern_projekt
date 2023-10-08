package szoftmern_projekt.projekt;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.sql.Time;

@Entity
public class MyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String Nev;
    private Timestamp Fuvar_Kezdet;
    private Timestamp Fuvar_Vege;
    private Time Fuvar_Ido;
    private Time Piheno_STOP;
    private Boolean Pihen;
    private String Szallitmany;
    private String Uticel;
    private String Uticel_Ceg;

    // Getterek és setterek
}
