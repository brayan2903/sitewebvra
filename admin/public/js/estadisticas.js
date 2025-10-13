var tbl_estadisticas;

$(document).ready(function() {
    $('#miTabla').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "admin/controller/estadisticas/controller_listar_estadisticas.php", // URL de tu controlador
            "type": "GET",
            "dataSrc": "data"  // Aquí indicamos que DataTables debe usar la clave "data" para los datos
        },
        "columns": [
            { "data": "facultades" },
            { "data": "carreras" },
            { "data": "grupos_investigacion" },
            { "data": "laboratorios" },
            { "data": "herramientas_investigacion" },
            { "data": "investigadores" }
        ]
    });
});


// Configuración de DataTable
$.ajax({
    url: 'controller/estadisticas/controller_listar_estadisticas.php',
    type: 'POST',
    success: function(response) {
        // La respuesta del servidor tendrá dos partes
        // Parte 1: Datos de las estadísticas
        const statsData = response[0].data; // Asegúrate de que esta parte coincida con tu estructura
        // Parte 2: Confirmación de éxito
        const success = response[1].success;

        // Mostrar los datos en la tabla
        $('#tabla_estadisticas').DataTable({
            data: statsData,
           "columns": [
                { "data": "facultades" },
                { "data": "carreras" },
                { "data": "grupos_investigacion" },
                { "data": "laboratorios" },
                { "data": "herramientas_investigacion" },
                { "data": "investigadores" },
                { "data": "estado" },
            ]

        });

        if (success === 1) {
            // Lógica si la operación fue exitosa
            console.log('Operación exitosa');
        }
    },
    error: function(error) {
        console.error('Error al cargar las estadísticas:', error);
    }
});


// Abrir el modal de edición de estadísticas
$('#tabla_estadisticas').on('click', '.editar', function() {
    let data = tbl_estadisticas.row($(this).parents('tr')).data();
    $('#txt_id_edit').val(data.id);
    $('#facultades_edit').val(data.facultades);
    $('#carreras_edit').val(data.carreras);
    $('#grupos_investigacion_edit').val(data.grupos_investigacion);
    $('#laboratorios_edit').val(data.laboratorios);
    $('#herramientas_edit').val(data.herramientas);
    $('#investigadores_edit').val(data.investigadores);

    $("#modal_editar_estadisticas").modal('show');  // Abrir el modal para editar
});


// Eliminar estadística
$('#tabla_estadisticas').on('click', '.eliminar', function () {
    let data = tbl_estadisticas.row($(this).parents('tr')).data();
    Swal.fire({
        title: '¿Desea eliminar esta estadística?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar_estadisticas(data.id);
        }
    });
});

// Abrir el modal de registro de estadísticas
function AbrirRegistroEstadisticas() {
    $("#modal_registro_estadisticas").modal({ keyboard: false });
    $("#modal_registro_estadisticas").modal('show');
}

// Registrar las estadísticas
function Registrar_Estadisticas() {
    let facultades = document.getElementById("facultades").value;
    let carreras = document.getElementById("carreras").value;
    let grupos_investigacion = document.getElementById("grupos_investigacion").value;
    let laboratorios = document.getElementById("laboratorios").value;
    let herramientas = document.getElementById("herramientas").value;
    let investigadores = document.getElementById("investigadores").value;

    if (!facultades || !carreras || !grupos_investigacion || !laboratorios || !herramientas || !investigadores) {
        return Swal.fire("Advertencia", "Todos los campos deben estar llenos", "warning");
    }

    let formData = new FormData();
    formData.append("facultades", facultades);
    formData.append("carreras", carreras);
    formData.append("grupos_investigacion", grupos_investigacion);
    formData.append("laboratorios", laboratorios);
    formData.append("herramientas", herramientas);
    formData.append("investigadores", investigadores);

    $.ajax({
        url: "../controller/estadisticas/controller_registrar_estadisticas.php",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == 1) {
                Swal.fire({
                    title: 'Estadísticas registradas',
                    text: 'Las estadísticas se registraron correctamente.',
                    icon: 'success'
                });
                tbl_estadisticas.ajax.reload();
                $("#modal_registro_estadisticas").modal('hide');
            } else {
                Swal.fire("Error", "Hubo un error al registrar las estadísticas", "error");
            }
        }
    });
}

// Modificar las estadísticas
// Modificar las estadísticas
function Modificar_Estadisticas() {
    let id = document.getElementById("txt_id_edit").value;
    let facultades = document.getElementById("facultades_edit").value;
    let carreras = document.getElementById("carreras_edit").value;
    let grupos_investigacion = document.getElementById("grupos_investigacion_edit").value;
    let laboratorios = document.getElementById("laboratorios_edit").value;
    let herramientas = document.getElementById("herramientas_edit").value;
    let investigadores = document.getElementById("investigadores_edit").value;

    // Verificar que todos los campos estén completos
    if (!facultades || !carreras || !grupos_investigacion || !laboratorios || !herramientas || !investigadores) {
        return Swal.fire("Advertencia", "Todos los campos deben estar llenos", "warning");
    }

    let formData = new FormData();
    formData.append("id", id);
    formData.append("facultades", facultades);
    formData.append("carreras", carreras);
    formData.append("grupos_investigacion", grupos_investigacion);
    formData.append("laboratorios", laboratorios);
    formData.append("herramientas", herramientas);
    formData.append("investigadores", investigadores);

    // Enviar los datos al servidor para actualizar las estadísticas
    $.ajax({
        url: "../controller/estadisticas/controller_modificar_estadisticas.php",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response == 1) {
                Swal.fire({
                    title: 'Estadísticas modificadas',
                    text: 'Las estadísticas se modificaron correctamente.',
                    icon: 'success'
                });
                tbl_estadisticas.ajax.reload();  // Recargar la tabla después de la actualización
                $("#modal_editar_estadisticas").modal('hide');  // Cerrar el modal
            } else {
                Swal.fire("Error", "Hubo un error al modificar las estadísticas", "error");
            }
        }
    });
}


// Eliminar estadísticas
function eliminar_estadisticas(id) {
    $.ajax({
        url: "../controller/estadisticas/controller_eliminar_estadisticas.php",
        type: 'POST',
        data: { id: id },
        success: function (response) {
            if (response == 1) {
                Swal.fire("Confirmación", "Estadísticas eliminadas con éxito", "success");
                tbl_estadisticas.ajax.reload();
            } else {
                Swal.fire("Error", "Hubo un error al eliminar las estadísticas", "error");
            }
        }
    });
}
