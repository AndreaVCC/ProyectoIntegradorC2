document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.querySelector('#add_odontologo_form');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = {
            matricula: document.querySelector('#new_matricula').value,
            nombre: document.querySelector('#new_nombre').value,
            apellido: document.querySelector('#new_apellido').value
        };

        const url = '/odontologos';
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
                addOdontologoToTable(data);
                addForm.reset();
                document.querySelector('#response_add_odontologo').style.display = "block";
                document.querySelector('#response_add_odontologo').innerHTML = "Odontólogo registrado correctamente";
                $('#addOdontologoModal').modal('hide'); // Ocultar el modal después de agregar
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('#response_add_odontologo').style.display = "block";
                document.querySelector('#response_add_odontologo').innerHTML = "Error al registrar odontólogo";
            });
    });

    function addOdontologoToTable(odontologo) {
        var table = document.getElementById("odontologoTableBody");

        // Eliminar el mensaje de "No hay odontólogos cargados" si existe
        var noDataRow = document.getElementById("no-data-row");
        if (noDataRow) {
            noDataRow.remove();
        }

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
});
