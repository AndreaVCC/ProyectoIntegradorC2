package CarrenoAndrea.ClinicaOdontologica.controller;

import CarrenoAndrea.ClinicaOdontologica.entity.Odontologo;
import CarrenoAndrea.ClinicaOdontologica.exception.BadRequestException;
import CarrenoAndrea.ClinicaOdontologica.exception.ResourceNotFoundException;
import CarrenoAndrea.ClinicaOdontologica.service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {

    @Autowired
    private OdontologoService odontologoService;

    @PostMapping
    public ResponseEntity<Odontologo> guardar(@RequestBody Odontologo odontologo) {
        return ResponseEntity.ok(odontologoService.guardarOdontologo(odontologo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Odontologo> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(id);
        if (odontologoBuscado.isPresent()) {
            return ResponseEntity.ok(odontologoBuscado.get());
        } else {
            throw new ResourceNotFoundException("Odontólogo no encontrado.");
        }
    }

    @PutMapping
    public ResponseEntity<Odontologo> actualizar(@RequestBody Odontologo odontologo) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(odontologo.getId());
        if (odontologoBuscado.isPresent()) {
            Odontologo odontologoActualizado = odontologoService.actualizarOdontologo(odontologo);
            return ResponseEntity.ok(odontologoActualizado);
        } else {
            throw new ResourceNotFoundException("Odontólogo no encontrado.");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(id);
        if (odontologoBuscado.isPresent()) {
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.ok("Odontólogo eliminado con éxito");
        } else {
            throw new ResourceNotFoundException("Odontólogo no encontrado.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Odontologo>> buscarTodos() {
        return ResponseEntity.ok(odontologoService.buscarTodos());
    }
}
