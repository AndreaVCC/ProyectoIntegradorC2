package CarrenoAndrea.ClinicaOdontologica.service;

import CarrenoAndrea.ClinicaOdontologica.entity.Turno;
import CarrenoAndrea.ClinicaOdontologica.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    private TurnoRepository turnoRepository;

    public Turno guardarTurno(Turno turno){
        return turnoRepository.save(turno);
    }

    public Turno actualizarTurno(Turno turno) {
        return turnoRepository.save(turno);
    }

    public Optional<Turno> buscarPorID(Long id){
        return turnoRepository.findById(id);
    }

    public void eliminarTurno(Long id){
        turnoRepository.deleteById(id);
    }

    public List<Turno> buscarTodos(){
        return turnoRepository.findAll();
    }
}

// Código anterior comentado
//package CarrenoAndrea.ClinicaOdontologica.service;
//
//import CarrenoAndrea.ClinicaOdontologica.dao.TurnoDAOLISTA;
//import CarrenoAndrea.ClinicaOdontologica.dao.iDao;
//import CarrenoAndrea.ClinicaOdontologica.entity.Turno;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class TurnoService {
//    private iDao<Turno> turnoDao;
//
//    public TurnoService() {
//        turnoDao = new TurnoDAOLISTA();
//    }
//
//    public Turno guardarTurno(Turno turno) {
//        return turnoDao.guardar(turno);
//    }
//
//    public Turno buscarTurno(Integer id) {
//        return turnoDao.buscarPorID(id);
//    }
//
//    public List<Turno> listarTurnos() {
//        return turnoDao.buscarTodos();
//    }
//
//    public Turno actualizarTurno(Turno turno) {
//        turnoDao.actualizar(turno);
//        return turno;
//    }
//
//    public void eliminarTurno(Integer id) {
//        turnoDao.eliminar(id);
//    }
//}
