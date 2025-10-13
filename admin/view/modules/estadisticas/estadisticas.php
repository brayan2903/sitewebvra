<script src="../public/js/estadisticas.js?rev=<?php echo time(); ?>"></script>

<div class="content__boxed">
    <div class="content__wrap">
        <nav aria-label="breadcrumb" class="pb-2">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">Portal Web</li>
                <li class="breadcrumb-item">Estadísticas</li>
            </ol>
        </nav>
        <!-- Table with toolbar -->
        <div class="card">
            <div class="card-header ">
                <h5 class="card-title mb-3">PANEL ADMINISTRATIVO DE ESTADÍSTICAS</h5>
                <div class="row">
                    <!-- Left toolbar -->
                    <div class="col-md-6 d-flex gap-1 align-items-center">
                        <button type="button" onclick="AbrirEstadisticas()" class="btn btn-primary hstack gap-2 align-self-center">
                            <i class="demo-psi-add fs-5"></i>
                            <span class="vr"></span>
                            Nuevo Registro
                        </button>
                    </div>
                    <!-- END : Left toolbar -->
                </div>
            </div>

            <div class="card-body ">
                <div class="table-responsive">
                    <table id="tabla_estadisticas" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Facultades</th>
                                <th>Carreras Profesionales</th>
                                <th>Grupos de Investigación</th>
                                <th>Laboratorios</th>
                                <th>Herramientas de Investigación</th>
                                <th>Investigadores RENACYT</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Los datos se cargarán dinámicamente desde la base de datos -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- END : Table with toolbar -->
    </div>
</div>

<!-- Modal para administrar estadísticas -->
<div class="modal fade" id="modal_estadisticas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Administrar Estadísticas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <!-- Facultades -->
                    <div class="col-lg-6 mb-3">
                        <label for="facultades" class="fw-bolder">Facultades :</label>
                        <input type="number" class="form-control" id="facultades" required>
                    </div>
                    <!-- Carreras Profesionales -->
                    <div class="col-lg-6 mb-3">
                        <label for="carreras" class="fw-bolder">Carreras Profesionales :</label>
                        <input type="number" class="form-control" id="carreras" required>
                    </div>
                    <!-- Grupos de Investigación -->
                    <div class="col-lg-6 mb-3">
                        <label for="grupos_investigacion" class="fw-bolder">Grupos de Investigación :</label>
                        <input type="number" class="form-control" id="grupos_investigacion" required>
                    </div>
                    <!-- Laboratorios -->
                    <div class="col-lg-6 mb-3">
                        <label for="laboratorios" class="fw-bolder">Laboratorios :</label>
                        <input type="number" class="form-control" id="laboratorios" required>
                    </div>
                    <!-- Herramientas de Investigación -->
                    <div class="col-lg-6 mb-3">
                        <label for="herramientas" class="fw-bolder">Herramientas de Investigación :</label>
                        <input type="number" class="form-control" id="herramientas" required>
                    </div>
                    <!-- Investigadores RENACYT -->
                    <div class="col-lg-6 mb-3">
                        <label for="investigadores" class="fw-bolder">Investigadores RENACYT :</label>
                        <input type="number" class="form-control" id="investigadores" required>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-outline-secondary" onclick="ActualizarEstadisticas()">Guardar Cambios</button>
            </div>
        </div>
    </div>
</div>

<script>
    // Función para abrir el modal de estadísticas
    function AbrirEstadisticas() {
        $('#modal_estadisticas').modal('show');
    }

    // Función para actualizar las estadísticas en la base de datos
    function ActualizarEstadisticas() {
        var facultades = $('#facultades').val();
        var carreras = $('#carreras').val();
        var grupos_investigacion = $('#grupos_investigacion').val();
        var laboratorios = $('#laboratorios').val();
        var herramientas = $('#herramientas').val();
        var investigadores = $('#investigadores').val();

        // Enviar los datos a un archivo PHP para actualizar las estadísticas
        $.ajax({
            url: '../controller/estadisticas/controller_registrar_estadisticas.php',
            type: 'POST',
            data: {
                facultades: facultades,
                carreras: carreras,
                grupos_investigacion: grupos_investigacion,
                laboratorios: laboratorios,
                herramientas: herramientas,
                investigadores: investigadores
            },
            success: function(response) {
                console.log(response); // Verificar lo que devuelve el servidor
                if (response == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Estadísticas actualizadas correctamente.',
                    });
                    $('#modal_estadisticas').modal('hide'); // Cerrar el modal
                    listar_estadisticas(); // Recargar la lista de estadísticas
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Ocurrió un error al actualizar las estadísticas.',
                    });
                }
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al actualizar las estadísticas.',
                });
            }
        });
    }

    // Función para listar las estadísticas en la tabla
    // Función para listar las estadísticas en la tabla
function listar_estadisticas() {
    // Hacer una solicitud AJAX para obtener las estadísticas desde el servidor
    $.ajax({
        url: '../controller/estadisticas/controller_listar_estadisticas.php',
        type: 'POST',
        success: function(response) {
            var data = JSON.parse(response); // Parseamos el JSON devuelto por PHP

            // Limpiar la tabla antes de insertar los nuevos datos
            $('#tabla_estadisticas tbody').empty();

            // Recorrer los datos y agregarlos a la tabla
            data.data.forEach(function(item) {
                var row = '<tr>';
                row += '<td>' + item.id + '</td>';
                row += '<td>' + item.facultades + '</td>';
                row += '<td>' + item.carreras + '</td>';
                row += '<td>' + item.grupos_investigacion + '</td>';
                row += '<td>' + item.laboratorios + '</td>';
                row += '<td>' + item.herramientas_investigacion + '</td>';
                row += '<td>' + item.investigadores + '</td>';
                row += '<td><button class="btn btn-warning" onclick="editarEstadistica(' + item.id + ')">Editar</button></td>';
                row += '</tr>';
                $('#tabla_estadisticas tbody').append(row); // Insertar la fila en la tabla
            });
        },
        error: function(error) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'No se pudo cargar las estadísticas.',
            });
        }
    });
}


    // Llamar a la función listar_estadisticas al cargar la página
    $(document).ready(function() {
        listar_estadisticas();
    });
</script>
