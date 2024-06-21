package CarrenoAndrea.ClinicaOdontologica.service;

import CarrenoAndrea.ClinicaOdontologica.entity.Paciente;
import CarrenoAndrea.ClinicaOdontologica.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente guardarPaciente(Paciente paciente){
        return pacienteRepository.save(paciente);
    }
    public Paciente actualizarPaciente(Paciente paciente){
        return pacienteRepository.save(paciente);
    }
    public Optional<Paciente> buscarPorID(Long id){
        return pacienteRepository.findById(id);
    }
    public Optional<Paciente> buscarPorEmail(String email){
        return pacienteRepository.findByEmail(email);
    }
    public void eliminarPaciente(Long id){
        pacienteRepository.deleteById(id);
    }
    public List<Paciente> buscarTodos(){
        return pacienteRepository.findAll();
    }
}

//package CarrenoAndrea.ClinicaOdontologica.service;
//
//import CarrenoAndrea.ClinicaOdontologica.entity.Paciente;
//import CarrenoAndrea.ClinicaOdontologica.dao.PacienteDAOH2;
//import CarrenoAndrea.ClinicaOdontologica.dao.iDao;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class PacienteService {
//    private iDao<Paciente> pacienteiDao;
//
//    public PacienteService() {
//        pacienteiDao = new PacienteDAOH2();
//    }
//
//    public Paciente guardarPaciente(Paciente paciente) {
//        return pacienteiDao.guardar(paciente);
//    }
//
//    public Paciente buscarPacientePorId(Integer id) {
//        return pacienteiDao.buscarPorID(id);
//    }
//
//    public List<Paciente> buscarTodos() {
//        return pacienteiDao.buscarTodos();
//    }
//
//    public void actualizarPaciente(Paciente paciente) {
//        pacienteiDao.actualizar(paciente);
//    }
//
//    public Paciente buscarPorCorreo(String correo) {
//        return pacienteiDao.buscarPorString(correo);
//    }
//
//    public void eliminarPaciente(Integer id) {
//        pacienteiDao.eliminar(id);
//    }
//
//}
