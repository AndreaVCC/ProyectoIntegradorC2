package CarrenoAndrea.ClinicaOdontologica.controller;

import CarrenoAndrea.ClinicaOdontologica.entity.Turno;
import CarrenoAndrea.ClinicaOdontologica.entity.Paciente;
import CarrenoAndrea.ClinicaOdontologica.entity.Odontologo;
import CarrenoAndrea.ClinicaOdontologica.service.OdontologoService;
import CarrenoAndrea.ClinicaOdontologica.service.PacienteService;
import CarrenoAndrea.ClinicaOdontologica.service.TurnoService;
import CarrenoAndrea.ClinicaOdontologica.exception.BadRequestException;
import CarrenoAndrea.ClinicaOdontologica.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {

    private final TurnoService turnoService;
    private final PacienteService pacienteService;
    private final OdontologoService odontologoService;

    @Autowired
    public TurnoController(TurnoService turnoService, PacienteService pacienteService, OdontologoService odontologoService) {
        this.turnoService = turnoService;
        this.pacienteService = pacienteService;
        this.odontologoService = odontologoService;
    }

    @PostMapping
    public ResponseEntity<Turno> guardarTurno(@RequestBody Turno turno) {
        if (turno.getPaciente() != null && turno.getPaciente().getId() != null &&
                turno.getOdontologo() != null && turno.getOdontologo().getId() != null) {

            Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(turno.getPaciente().getId());
            Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(turno.getOdontologo().getId());

            if (pacienteBuscado.isPresent() && odontologoBuscado.isPresent()) {
                Turno nuevoTurno = turnoService.guardarTurno(turno);
                nuevoTurno.setPaciente(pacienteBuscado.get());
                nuevoTurno.setOdontologo(odontologoBuscado.get());
                return ResponseEntity.ok(nuevoTurno);
            } else {
                throw new BadRequestException("No se encontró el paciente o el odontólogo.");
            }
        } else {
            throw new BadRequestException("Datos incompletos para crear el turno.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Turno>> listarTodosLosTurnos() {
        return ResponseEntity.ok(turnoService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turno> buscarTurnoPorId(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Turno> turno = turnoService.buscarPorID(id);
        return turno.map(ResponseEntity::ok).orElseThrow(() -> new ResourceNotFoundException("Turno no encontrado."));
    }

    @PutMapping
    public ResponseEntity<Turno> actualizarTurno(@RequestBody Turno turno) {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPorID(turno.getPaciente().getId());
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarPorID(turno.getOdontologo().getId());

        if (pacienteBuscado.isPresent() && odontologoBuscado.isPresent()) {
            Turno turnoActualizado = turnoService.actualizarTurno(turno);
            return ResponseEntity.ok(turnoActualizado);
        } else {
            throw new BadRequestException("No se encontró el paciente o el odontólogo.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Turno> turnoBuscado = turnoService.buscarPorID(id);
        if (turnoBuscado.isPresent()) {
            turnoService.eliminarTurno(id);
            return ResponseEntity.ok("Turno eliminado con éxito");
        } else {
            throw new ResourceNotFoundException("Turno no encontrado.");
        }
    }
}
