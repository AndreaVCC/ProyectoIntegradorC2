document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.querySelector('#add_paciente_form');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = {
            cedula: document.querySelector('#new_cedula').value,
            nombre: document.querySelector('#new_nombre').value,
            apellido: document.querySelector('#new_apellido').value,
            email: document.querySelector('#new_email').value,
            domicilio: {
                calle: document.querySelector('#new_calle').value,
                numero: document.querySelector('#new_numero').value,
                localidad: document.querySelector('#new_localidad').value,
                provincia: document.querySelector('#new_provincia').value,
            }
        };

        const url = '/pacientes';
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
                addPacienteToTable(data);
                addForm.reset();
                document.querySelector('#response_add').style.display = "block";
                document.querySelector('#response_add').innerHTML = "Paciente registrado correctamente";
                $('#addPacienteModal').modal('hide'); // Ocultar el modal después de agregar
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('#response_add').style.display = "block";
                document.querySelector('#response_add').innerHTML = "Error al registrar paciente";
            });
    });

    function addPacienteToTable(paciente) {
        var table = document.getElementById("pacienteTableBody");

        // Eliminar el mensaje de "No hay pacientes cargados" si existe
        var noDataRow = document.getElementById("no-data-row");
        if (noDataRow) {
            noDataRow.remove();
        }

        var pacienteRow = table.insertRow();
        let tr_id = 'tr_' + paciente.id;
        pacienteRow.id = tr_id;

        let deleteButton = '<button id="btn_delete_' + paciente.id + '" type="button" onclick="deleteBy('+paciente.id+')" class="btn btn-danger btn_delete"><i class="bi bi-trash"></i></button>';
        let updateButton = '<button id="btn_id_' + paciente.id + '" type="button" onclick="findBy('+paciente.id+')" class="btn btn-info btn_id"><i class="bi bi-pencil-square"></i></button>';

        let domicilio = paciente.domicilio ? `${paciente.domicilio.calle} ${paciente.domicilio.numero}, ${paciente.domicilio.localidad}, ${paciente.domicilio.provincia}` : '';

        pacienteRow.innerHTML = '<td>' + paciente.id + '</td>' +
                                '<td class="td_cedula">' + paciente.cedula + '</td>' +
                                '<td class="td_nombre">' + paciente.nombre + '</td>' +
                                '<td class="td_apellido">' + paciente.apellido + '</td>' +
                                '<td class="td_email">' + paciente.email + '</td>' +
                                '<td class="td_domicilio">' + domicilio + '</td>' +
                                '<td>' + updateButton + ' ' + deleteButton + '</td>';
    }
});
