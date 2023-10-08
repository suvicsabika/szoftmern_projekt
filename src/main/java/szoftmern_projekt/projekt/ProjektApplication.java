package szoftmern_projekt.projekt;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import szoftmern_projekt.projekt.model.Nyilvantartas;
import szoftmern_projekt.projekt.repository.NyilvantartasRepository;


@SpringBootApplication
public class ProjektApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjektApplication.class, args);
	}

	//	public String Nev = String.valueOf("Koczka Géza");
	//	public Timestamp Fuvar_Kezdet = Timestamp.valueOf("2023-10-07 00:41:20");
	//	public Timestamp Fuvar_Vege = Timestamp.valueOf("2023-10-08 18:30:05");
	//	public Time Fuvar_Ido = Time.valueOf("08:10:10");
	//	public Time Piheno_STOP = Time.valueOf("00:00:00");
	//	public Boolean Pihen = false;
	//	public String Szallitmany = "Kokain";
	//	public String Uticel = "Rotterdam";
	//	public String Uticel_Ceg = "Rafael és Rómeó KFT.";

	@Bean
	CommandLineRunner commandLineRunner(NyilvantartasRepository repository) {
		return args -> repository.save(new Nyilvantartas(null, "Koczka Géza" , "2023-10-07 00:41:20", "2023-10-08 18:30:05", "08:10:10", "00:00:00", false, "Kokain", "Rotterdam", "Rafael és Rómeó KFT."));
	}
}