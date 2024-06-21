function deleteBy(turnoId) {
    const url = `/turnos/${turnoId}`;
    const settings = {
        method: 'DELETE'
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                const row = document.getElementById(`tr_${turnoId}`);
                if (row) {
                    row.remove();
                }

                // Verificar si la tabla está vacía y mostrar el mensaje de "No hay turnos cargados"
                const table = document.getElementById("turnoTableBody");
                if (table.rows.length === 0) {
                    const noDataRow = document.createElement('tr');
                    noDataRow.id = 'no-data-row';
                    noDataRow.innerHTML = '<td colspan="5" class="text-center">No hay turnos cargados</td>';
                    table.appendChild(noDataRow);
                }
            } else {
                console.error('Error al eliminar el turno');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
