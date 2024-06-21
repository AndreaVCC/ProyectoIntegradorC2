package CarrenoAndrea.ClinicaOdontologica.controller;

import CarrenoAndrea.ClinicaOdontologica.entity.Paciente;
import CarrenoAndrea.ClinicaOdontologica.exception.BadRequestException;
import CarrenoAndrea.ClinicaOdontologica.exception.ResourceNotFoundException;
import CarrenoAndrea.ClinicaOdontologica.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<Paciente> registrarUnPaciente(@RequestBody Paciente paciente) {
        return ResponseEntity.ok(pacienteService.guardarPaciente(paciente));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPacienteID(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(id);
        if (pacienteBuscado.isPresent()) {
            return ResponseEntity.ok(pacienteBuscado.get());
        } else {
            throw new ResourceNotFoundException("Paciente no encontrado.");
        }
    }

    @PutMapping
    public ResponseEntity<Paciente> actualizarPaciente(@RequestBody Paciente paciente) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(paciente.getId());
        if (pacienteBuscado.isPresent()) {
            Paciente pacienteActualizado = pacienteService.actualizarPaciente(paciente);
            return ResponseEntity.ok(pacienteActualizado);
        } else {
            throw new ResourceNotFoundException("Paciente no encontrado.");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(id);
        if (pacienteBuscado.isPresent()) {
            pacienteService.eliminarPaciente(id);
            return ResponseEntity.ok("Paciente eliminado con éxito");
        } else {
            throw new ResourceNotFoundException("Paciente no encontrado.");
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Paciente> buscarPorEmail(@PathVariable String email) throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorEmail(email);
        if (pacienteBuscado.isPresent()) {
            return ResponseEntity.ok(pacienteBuscado.get());
        } else {
            throw new ResourceNotFoundException("Paciente no encontrado.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> buscarTodos() {
        return ResponseEntity.ok(pacienteService.buscarTodos());
    }
}
