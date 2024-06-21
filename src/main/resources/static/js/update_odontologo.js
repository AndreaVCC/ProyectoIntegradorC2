document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.querySelector('#update_odontologo_form');

    updateForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const odontologo = {
            id: document.getElementById('odontologo_id').value,
            matricula: document.getElementById('matricula').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value
        };

        const url = `/odontologos`;
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(odontologo)
        };

        fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al actualizar el odontólogo');
            }
        })
        .then(data => {
            // Refrescar la lista de odontólogos
            refreshOdontologosList();
            document.querySelector('#response_update_odontologo').style.display = "block";
            document.querySelector('#response_update_odontologo').innerHTML = "Odontólogo actualizado con éxito";
            $('#updateOdontologoModal').modal('hide'); // Ocultar el modal después de actualizar
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector('#response_update_odontologo').style.display = "block";
            document.querySelector('#response_update_odontologo').innerHTML = "Error al actualizar el odontólogo";
        });
    });

    function findBy(id) {
        const url = `/odontologos/${id}`;
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#odontologo_id').value = data.id;
            document.querySelector('#matricula').value = data.matricula;
            document.querySelector('#nombre').value = data.nombre;
            document.querySelector('#apellido').value = data.apellido;
            $('#updateOdontologoModal').modal('show'); // Mostrar el modal de actualización
        });
    }

    window.findBy = findBy; // Hacer findBy disponible globalmente para los botones

    // Refrescar la lista de odontólogos
    function refreshOdontologosList() {
        const url = '/odontologos';
        const settings = {
            method: 'GET'
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                var table = document.getElementById("odontologoTableBody");
                table.innerHTML = '';

                if (data.length === 0) {
                    var noDataRow = table.insertRow();
                    noDataRow.id = 'no-data-row';
                    noDataRow.innerHTML = '<td colspan="5" class="text-center">No hay odontólogos cargados</td>';
                } else {
                    for (let odontologo of data) {
                        var odontologoRow = table.insertRow();
                        let tr_id = 'tr_' + odontologo.id;
                        odontologoRow.id = tr_id;

                        let deleteButton = '<button id="btn_delete_' + odontologo.id + '" type="button" onclick="deleteBy('+odontologo.id+')" class="btn btn-danger btn_delete"><i class="bi bi-trash"></i></button>';
                        let updateButton = '<button id="btn_id_' + odontologo.id + '" type="button" onclick="findBy('+odontologo.id+')" class="btn btn-info btn_id"><i class="bi bi-pencil-square"></i></button>';

                        odontologoRow.innerHTML = '<td>' + odontologo.id + '</td>' +
                                                  '<td class="td_matricula">' + odontologo.matricula + '</td>' +
                                                  '<td class="td_nombre">' + odontologo.nombre + '</td>' +
                                                  '<td class="td_apellido">' + odontologo.apellido + '</td>' +
                                                  '<td>' + updateButton + ' ' + deleteButton + '</td>';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
