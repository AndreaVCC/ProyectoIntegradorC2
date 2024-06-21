window.addEventListener('DOMContentLoaded', function () {
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
});
