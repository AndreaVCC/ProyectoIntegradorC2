document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.querySelector('#update_turno_form');

    if (updateForm) {
        updateForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const turnoId = document.querySelector('#turno_id').value;
            const pacienteId = document.querySelector('#update_paciente_id').value;
            const odontologoId = document.querySelector('#update_odontologo_id').value;
            const fechaHora = document.querySelector('#update_fecha').value;

            if (!pacienteId || !odontologoId || !fechaHora) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const formData = {
                id: turnoId,
                paciente: { id: pacienteId },
                odontologo: { id: odontologoId },
                fecha: fechaHora
            };

            const url = '/turnos';
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            };

            fetch(url, settings)
                .then(response => response.json())
                .then(data => {
                    cargarTurnos();
                    document.querySelector('#response_update').style.display = "block";
                    document.querySelector('#response_update').innerHTML = "Turno actualizado correctamente";
                    $('#updateTurnoModal').modal('hide'); // Ocultar el modal después de actualizar
                })
                .catch(error => {
                    console.log(error);
                    document.querySelector('#response_update').style.display = "block";
                    document.querySelector('#response_update').innerHTML = "Error al actualizar turno";
                });
        });
    }
});

function findBy(id) {
    const url = '/turnos/' + id;
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#turno_id').value = data.id;
            document.querySelector('#update_paciente_id').value = data.paciente.id;
            document.querySelector('#update_odontologo_id').value = data.odontologo.id;
            document.querySelector('#update_fecha').value = data.fecha.replace(" ", "T");
            $('#updateTurnoModal').modal('show');
        })
        .catch(error => {
            console.log(error);
        });
}
