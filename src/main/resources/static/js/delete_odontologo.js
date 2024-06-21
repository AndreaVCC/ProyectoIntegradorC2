function deleteBy(odontologoId) {
    const url = `/odontologos/eliminar/${odontologoId}`;
    const settings = {
        method: 'DELETE'
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                const row = document.getElementById(`tr_${odontologoId}`);
                if (row) {
                    row.remove();
                }

                // Verificar si la tabla está vacía y mostrar el mensaje de "No hay odontólogos cargados"
                var table = document.getElementById("odontologoTableBody");
                if (table.rows.length === 0) {
                    var noDataRow = table.insertRow();
                    noDataRow.id = 'no-data-row';
                    noDataRow.innerHTML = '<td colspan="5" class="text-center">No hay odontólogos cargados</td>';
                }
            } else {
                console.error('Error al eliminar el odontólogo');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
