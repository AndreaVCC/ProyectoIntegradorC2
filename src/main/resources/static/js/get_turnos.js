document.addEventListener('DOMContentLoaded', function () {
    cargarTurnos();
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
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            if (data.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.id = 'no-data-row';
                noDataRow.innerHTML = '<td colspan="5" class="text-center">No hay turnos cargados</td>';
                tableBody.appendChild(noDataRow);
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
