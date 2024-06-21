document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.querySelector('#add_turno_form');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const pacienteId = document.querySelector('#paciente_id').value;
        const odontologoId = document.querySelector('#odontologo_id').value;
        const fechaHora = document.querySelector('#fecha').value;

        if (!pacienteId || !odontologoId || !fechaHora) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const formData = {
            paciente: { id: pacienteId },
            odontologo: { id: odontologoId },
            fecha: fechaHora
        };

        const url = '/turnos';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                addTurnoToTable(data);
                addForm.reset();
                document.querySelector('#response_add').style.display = "block";
                document.querySelector('#response_add').innerHTML = "Turno agregado correctamente";
                $('#addTurnoModal').modal('hide'); // Ocultar el modal después de agregar
            })
            .catch(error => {
                console.log(error);
                document.querySelector('#response_add').style.display = "block";
                document.querySelector('#response_add').innerHTML = "Error al agregar turno: " + error.message;
            });
    });

    function addTurnoToTable(turno) {
        const table = document.getElementById("turnoTableBody");

        // Eliminar el mensaje de "No hay turnos cargados" si existe
        var noDataRow = document.getElementById("no-data-row");
        if (noDataRow) {
            noDataRow.remove();
        }

        const turnoRow = table.insertRow();
        const tr_id = 'tr_' + turno.id;
        turnoRow.id = tr_id;

        // Formatear la fecha y hora
        const fechaHora = new Date(turno.fecha);
        const fechaFormateada = fechaHora.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const deleteButton = '<button id="btn_delete_' + turno.id + '" type="button" onclick="deleteBy('+turno.id+')" class="btn btn-danger btn_delete"><i class="bi bi-trash"></i></button>';
        const updateButton = '<button id="btn_id_' + turno.id + '" type="button" onclick="findBy('+turno.id+')" class="btn btn-info btn_id"><i class="bi bi-pencil-square"></i></button>';

        turnoRow.innerHTML = '<td>' + turno.id + '</td>' +
                             '<td class="td_paciente">' + turno.paciente.nombre + ' ' + turno.paciente.apellido + '</td>' +
                             '<td class="td_odontologo">' + turno.odontologo.nombre + ' ' + turno.odontologo.apellido + '</td>' +
                             '<td class="td_fecha_hora">' + fechaFormateada + '</td>' +
                             '<td>' + updateButton + ' ' + deleteButton + '</td>';
    }
});

function cargarTurnos() {
    const url = '/turnos';
    const settings = {
        method: 'GET'
    };

    fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("turnoTableBody");
            tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
            if (data.length === 0) {
                var noDataRow = tableBody.insertRow();
                noDataRow.id = 'no-data-row';
                noDataRow.innerHTML = '<td colspan="5" class="text-center">No hay turnos cargados</td>';
            } else {
                for (let turno of data) {
                    addTurnoToTable(turno);
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function addTurnoToTable(turno) {
    const table = document.getElementById("turnoTableBody");

    // Eliminar el mensaje de "No hay turnos cargados" si existe
    var noDataRow = document.getElementById("no-data-row");
    if (noDataRow) {
        noDataRow.remove();
    }

    const turnoRow = table.insertRow();
    const tr_id = 'tr_' + turno.id;
    turnoRow.id = tr_id;

    // Formatear la fecha y hora
    const fechaHora = new Date(turno.fecha);
    const fechaFormateada = fechaHora.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const deleteButton = '<button id="btn_delete_' + turno.id + '" type="button" onclick="deleteBy('+turno.id+')" class="btn btn-danger btn_delete"><i class="bi bi-trash"></i></button>';
    const updateButton = '<button id="btn_id_' + turno.id + '" type="button" onclick="findBy('+turno.id+')" class="btn btn-info btn_id"><i class="bi bi-pencil-square"></i></button>';

    turnoRow.innerHTML = '<td>' + turno.id + '</td>' +
                         '<td class="td_paciente">' + turno.paciente.nombre + ' ' + turno.paciente.apellido + '</td>' +
                         '<td class="td_odontologo">' + turno.odontologo.nombre + ' ' + turno.odontologo.apellido + '</td>' +
                         '<td class="td_fecha_hora">' + fechaFormateada + '</td>' +
                         '<td>' + updateButton + ' ' + deleteButton + '</td>';
}
