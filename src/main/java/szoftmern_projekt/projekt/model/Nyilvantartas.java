package szoftmern_projekt.projekt.model;

import org.springframework.data.annotation.Id;

import java.sql.Time;
import java.sql.Timestamp;

public record Nyilvantartas(@Id Integer ID, String Nev, String Fuvar_Kezdet, String Fuvar_Vege, String Fuvar_Ido, String Piheno_STOP, Boolean Pihen, String Szallitmany, String Uticel, String Uticel_Ceg) {
}
