window.addEventListener('DOMContentLoaded', function () {
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
});
