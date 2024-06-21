package CarrenoAndrea.ClinicaOdontologica;
//import CarrenoAndrea.ClinicaOdontologica.dao.BD;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClinicaOdontologicaApplication {

	public static void main(String[] args) {
//		BD.borrarTablas();
//
//		BD.crearTablas();
//
//		BD.insertarDatosDePrueba();
		SpringApplication.run(ClinicaOdontologicaApplication.class, args);
	}

}