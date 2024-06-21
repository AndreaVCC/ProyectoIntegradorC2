package CarrenoAndrea.ClinicaOdontologica.repository;

import CarrenoAndrea.ClinicaOdontologica.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
    // Puedes agregar métodos de búsqueda personalizados si los necesitas
}
