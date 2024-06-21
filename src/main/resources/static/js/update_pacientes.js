document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.querySelector('#update_paciente_form');

    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const paciente = {
            id: document.getElementById('paciente_id').value,
            cedula: document.getElementById('cedula').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            domicilio: {
                calle: document.getElementById('calle').value,
                numero: document.getElementById('numero').value,
                localidad: document.getElementById('localidad').value,
                provincia: document.getElementById('provincia').value
            }
        };

        const url = `/pacientes`;
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        };

        fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al actualizar el paciente');
            }
        })
        .then(data => {
            // Refrescar la lista de pacientes
            refreshPacientesList();
            document.querySelector('#response_update').style.display = "block";
            document.querySelector('#response_update').innerHTML = "Paciente actualizado con éxito";
            $('#updatePacienteModal').modal('hide'); // Ocultar el modal después de actualizar
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector('#response_update').style.display = "block";
            document.querySelector('#response_update').innerHTML = "Error al actualizar el paciente";
        });
    });

    function findBy(id) {
        const url = `/pacientes/${id}`;
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#paciente_id').value = data.id;
            document.querySelector('#cedula').value = data.cedula;
            document.querySelector('#nombre').value = data.nombre;
            document.querySelector('#apellido').value = data.apellido;
            document.querySelector('#email').value = data.email;
            document.querySelector('#calle').value = data.domicilio.calle;
            document.querySelector('#numero').value = data.domicilio.numero;
            document.querySelector('#localidad').value = data.domicilio.localidad;
            document.querySelector('#provincia').value = data.domicilio.provincia;
            $('#updatePacienteModal').modal('show'); // Mostrar el modal de actualización
        });
    }

    window.findBy = findBy; // Hacer findBy disponible globalmente para los botones

    // Refrescar la lista de pacientes
    function refreshPacientesList() {
        const url = '/pacientes';
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                var table = document.getElementById("pacienteTableBody");
                table.innerHTML = '';

                if (data.length === 0) {
                    var noDataRow = table.insertRow();
                    noDataRow.id = 'no-data-row';
                    noDataRow.innerHTML = '<td colspan="7" class="text-center">No hay pacientes cargados</td>';
                } else {
                    for (let paciente of data) {
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
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
