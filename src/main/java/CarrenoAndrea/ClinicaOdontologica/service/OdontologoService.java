package CarrenoAndrea.ClinicaOdontologica.service;

import CarrenoAndrea.ClinicaOdontologica.entity.Odontologo;
import CarrenoAndrea.ClinicaOdontologica.repository.OdontologoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    @Autowired
    private OdontologoRepository odontologoRepository;

    public Odontologo guardarOdontologo(Odontologo odontologo){
        return odontologoRepository.save(odontologo);
    }
    public Odontologo actualizarOdontologo(Odontologo odontologo) {
        return odontologoRepository.save(odontologo);
    }
    public Optional<Odontologo> buscarPorID(Long id){
        return odontologoRepository.findById(id);
    }
    public void eliminarOdontologo(Long id){
        odontologoRepository.deleteById(id);
    }
    public List<Odontologo> buscarTodos(){
        return odontologoRepository.findAll();
    }
}

// Código anterior comentado
//package CarrenoAndrea.ClinicaOdontologica.service;
//
//import CarrenoAndrea.ClinicaOdontologica.dao.OdontologoDAOH2;
//import CarrenoAndrea.ClinicaOdontologica.dao.iDao;
//import CarrenoAndrea.ClinicaOdontologica.entity.Odontologo;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class OdontologoService {
//    private iDao<Odontologo> odontologoiDao;
//
//    public OdontologoService() {
//        odontologoiDao = new OdontologoDAOH2();
//    }
//
//    public Odontologo guardarOdontologo(Odontologo odontologo) {
//        return odontologoiDao.guardar(odontologo);
//    }
//
//    public Odontologo buscarOdontologoPorId(Integer id) {
//        return odontologoiDao.buscarPorID(id);
//    }
//
//    public List<Odontologo> buscarTodos() {
//        return odontologoiDao.buscarTodos();
//    }
//
//    public void actualizarOdontologo(Odontologo odontologo) {
//        odontologoiDao.actualizar(odontologo);
//    }
//
//    public void eliminarOdontologo(Integer id) {
//        odontologoiDao.eliminar(id);
//    }
//}
