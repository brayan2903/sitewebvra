var tbl_modal;
function listar_modal() {
    tbl_modal = $("#tabla_modal").DataTable({
        "ordering": false,
        "bLengthChange": true,
        "searching": { "regex": false },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 10,
        "destroy": true,
        "async": true,
        "processing": true,
        "ajax": {
            "url": "../controller/modal/controller_listar_modal.php",
            type: 'POST'
        },
        "columns": [
            { "defaultContent": "" },
            { "data": "modal_desc" },
            {
                "data": "modal_imagen", render: function (data, type, row) {
                    if(data==''){
                        return '<img src="../controller/empleado/foto/noimage.jpg" class="img-fluid " alt="..." width="40">';
                    }else{
                        return '<img src="../' + data + '" class="img-fluid" alt="..." width="200">';
                    }
                }
            },
            { "data": "modal_fecha" },
            { "defaultContent": "<button class='editar btn btn-secondary btn-sm'><i class='fas fa-pencil-alt'></i></button>&nbsp<button class=' eliminar btn btn-danger btn-sm'><i class='fa-solid fa-trash'></i></button>" },
        ],

        "language": idioma_espanol,
        select: true
    });
    tbl_modal.on('draw.td', function () {
        var PageInfo = $("#tabla_modal").DataTable().page.info();
        tbl_modal.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}


function AbrirRegistro() {
    $("#modal_registro").modal({ backdrop: 'static', keyboard: false });
    $("#modal_registro").modal('show');

    // Limpiar campos y resetear imagen
    document.getElementById("asunto_incidencia").value = "";
    document.getElementById("txt_img_modal").value = "";
    document.getElementById("imagen__prev_modal").src = "../controller/empleado/foto/noimage.jpg";
}


function Registrar_Modal() {
    let comunicado = document.getElementById("asunto_incidencia").value;
    let archivoobj = $("#txt_img_modal")[0].files[0];
    let idarea = document.getElementById("txtprincipalareaid").value;

    // Verifica que el comunicado no esté vacío
    if (comunicado.trim() === "") {
        Swal.fire("Mensaje de Advertencia", "El campo Comunicado está vacío", "warning");
        return;
    }

    // Verifica que se haya seleccionado un archivo
    if (!archivoobj) {
        Swal.fire("Mensaje de Advertencia", "Debe seleccionar un archivo de imagen", "warning");
        return;
    }

    // Validación de la extensión del archivo (solo se permiten imágenes .jpg, .png, .jpeg)
    let extension = archivoobj.name.split('.').pop().toLowerCase();
    let extensionesPermitidas = ['jpg', 'jpeg', 'png'];
    if (!extensionesPermitidas.includes(extension)) {
        Swal.fire("Mensaje de Error", "Solo se permiten archivos de tipo imagen (.jpg, .png, .jpeg)", "error");
        return;
    }

    // Generamos un nombre único para el archivo
    let f = new Date();
    let nombrearchivo = "ARCH" + f.getDate() + "" + (f.getMonth() + 1) + "" + f.getFullYear() + "" + f.getHours() + "" + f.getMilliseconds() + "." + extension;

    // Creamos el FormData y lo preparamos para enviarlo
    let formData = new FormData();
    formData.append("comunicado", comunicado);
    formData.append("nombrearchivo", nombrearchivo);
    formData.append("idarea", idarea);
    formData.append("archivoobj", archivoobj);

    // Enviamos el FormData mediante AJAX
    $.ajax({
        url: "../controller/modal/controller_registrar_modal.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(resp) {
            if (resp == 1) {
                Swal.fire({
                    title: 'Publicando...',
                    text: 'Subiendo Archivos al servidor',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        Swal.fire("Mensaje de Confirmación", "El Modal se registró con éxito", "success");
                        document.getElementById('asunto_incidencia').value = "";
                        document.getElementById('txt_img_modal').value = "";
                        tbl_modal.ajax.reload();
                        $("#modal_registro").modal('hide');
                    }
                });
            } else {
                Swal.fire("Mensaje de Error", "Comuniquese con soporte informático", "error");
            }
        }
    });
}


$('#tabla_modal').on('click', '.editar', function () {
    let data = tbl_modal.row($(this).parents('tr')).data();
    if (tbl_modal.row(this).child.isShown()) {
        data = tbl_modal.row(this).data();
    }

    $("#modal_editar").modal('show');

    document.getElementById('txt_id_modal').value = data.modal_id;
    document.getElementById('asunto_incidencia_edit').value = data.modal_desc;

    let rutaImagen = (data.modal_imagen && data.modal_imagen.trim() !== "")
        ? "../" + data.modal_imagen
        : "../controller/empleado/foto/noimage.jpg";

    document.getElementById('imagen__prev_modal_edit').src = rutaImagen;

    // Limpiar input file (no se puede cargar el archivo por código)
    document.getElementById('txt_img_modal_edit').value = "";
});




$('#tabla_modal').on('click', '.eliminar', function () {
    let data = tbl_modal.row($(this).parents('tr')).data();
    if (tbl_modal.row(this).child.isShown()) {
        data = tbl_modal.row(this).data();
    }
    Swal.fire({
        title: '¿Desea Eliminar el Modal?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar_modal(data.modal_id);
        }
    });

});

function Modificar_Modal(){
    let id = document.getElementById('txt_id_modal').value;
    let comunicado = document.getElementById('asunto_incidencia_edit').value.trim();
    let archivoobj = $("#txt_img_modal_edit")[0].files[0]; // puede ser undefined
    let formData = new FormData();

    if (comunicado === "") {
        Swal.fire("Mensaje de Advertencia", "El campo Comunicado está vacío", "warning");
        return;
    }

    let nombrearchivo = "";
    if (archivoobj) {
        let extension = archivoobj.name.split('.').pop().toLowerCase();
        let f = new Date();
        nombrearchivo = "ARCH" + f.getDate() + "" + (f.getMonth() + 1) + "" + f.getFullYear() + "" + f.getHours() + "" + f.getMilliseconds() + "." + extension;
        formData.append("archivoobj", archivoobj);
        formData.append("nombrearchivo", nombrearchivo);
    }

    formData.append("id", id);
    formData.append("comunicado", comunicado);

    $.ajax({
        url: "../controller/modal/controller_modificar_modal.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false
    }).done(function(resp){
        if (resp == 1) {
            Swal.fire({
                title: 'Actualizando...',
                text: 'Subiendo cambios al servidor',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => Swal.showLoading()
            }).then(() => {
                Swal.fire("Confirmación", "El Modal se actualizó con éxito", "success");
                $("#modal_editar").modal('hide');
                tbl_modal.ajax.reload();
            });
        } else {
            Swal.fire("Mensaje de Error", "Comuniquese con soporte informático", "error");
        }
    });
}


function eliminar_modal(id) {
    $.ajax({
        "url": "../controller/modal/controller_eliminar_modal.php",
        type: 'POST',
        data: {
            id: id,
        }
    }).done(function (resp) {
        if (resp == 1) {
            Swal.fire("Mensaje de Confirmacion", "Modal Eliminado con Exito", "success").then((value) => {
                tbl_modal.ajax.reload();
            });


        } else if (resp == 2) {
            Swal.fire("Mensaje de Advertencia", "El Modal se Encuentra Activo", "warning");
        } else {
            Swal.fire("Mensaje de Error", "Comuniquese con Soporte Informatico", "error");
        }

    });
}