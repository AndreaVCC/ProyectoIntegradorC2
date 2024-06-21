function deleteBy(pacienteId) {
    const url = `/pacientes/eliminar/${pacienteId}`;
    const settings = {
        method: 'DELETE'
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                const row = document.getElementById(`tr_${pacienteId}`);
                if (row) {
                    row.remove();
                }

                // Verificar si la tabla está vacía y mostrar el mensaje de "No hay pacientes cargados"
                var table = document.getElementById("pacienteTableBody");
                if (table.rows.length === 0) {
                    var noDataRow = table.insertRow();
                    noDataRow.id = 'no-data-row';
                    noDataRow.innerHTML = '<td colspan="7" class="text-center">No hay pacientes cargados</td>';
                }
            } else {
                console.error('Error al eliminar el paciente');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
