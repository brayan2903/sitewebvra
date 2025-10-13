<script src="//cdn.ckeditor.com/4.25.1-lts/standard/ckeditor.js"></script>
<script src="../public/js/oficios.js?rev=<?php echo time(); ?>"></script>

<div class="content__boxed">
    <div class="content__wrap">
        <nav aria-label="breadcrumb" class="pb-2">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">Portal Web</li>
                <li class="breadcrumb-item">Noticias</li>
            </ol>
        </nav>
        <!-- Table with toolbar -->
        <div class="card">
            <div class="card-header ">
                <h5 class="card-title mb-3">PANEL ADMINISTRATIVO DE NOTICIAS</h5>
                <div class="row ">

                    <!-- Left toolbar -->
                    <div class="col-md-6 d-flex gap-1 align-items-center">
                        <button type="button" onclick="AbrirRegistro()" class="btn btn-primary hstack gap-2 align-self-center">
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
                    <table id="tabla_oficio" class="display " style="width:100%">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titulo</th>
                                <th>Mas Datos</th>
                                <th>Fecha Creacion</th>
                                <th>Estatus</th>
                                <th style="min-width:90px">Accion</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <!-- END : Table with toolbar -->
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="modal_registro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">REGISTRO DE OFICIO MULTIPLE</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Titulo :</label>
                        <input type="text" class="form-control" id="txt_titulo">
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Descripción :</label>
                        <textarea id="txt_desc" rows="3" class="form-control" style="resize:none;"></textarea>
                    </div>
                    <div class="col-lg-12 mb-3">
                        <div class="d-flex flex-column">
                            <label for="" class="fw-bolder">Subir Vista Previa PNG/JPG :</label>
                            <img class="mb-3" src="../controller/comunicado/img/default_large.png" alt="" id="imagen__prev_c">
                        </div>
                        <input type='file' class='form-control' id='txt_img_prev'>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="" class="fw-bolder">Cargar Documento PDF :</label>
                        <input type="file" class="form-control" id="txt_documento">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-outline-secondary" onclick="Registrar_Oficio()">Registrar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->

<!-- Modal -->
<div class="modal fade" id="modal_editar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">EDITAR OFICIO MULTIPLE</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Titulo :</label>
                        <input type="text" class="form-control" id="txt_titulo_edit">
                        <input type="text" hidden id="txt_id_edit">
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Descripción :</label>
                        <textarea id="txt_desc_edit" rows="3" class="form-control" style="resize:none;"></textarea>
                    </div>
                    <div class="col-lg-12 mb-3">
                        <div class="d-flex flex-column">
                            <label for="" class="fw-bolder">Subir Vista Previa PNG/JPG :</label>
                            <img class="mb-3" src="" alt="" id="imagen__prev_e">
                        </div>
                        <input type='file' class='form-control' id='txt_img_prev_edit'>
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Cargar Documento PDF :</label>
                        <input type="file" class="form-control" id="txt_documento_edit">
                    </div>
                    <div class="col-lg-12 mb-3">
                        <label for="" class="fw-bolder">Estado :</label>
                        <select name="" id="select_estatus" class="form-select js-example-basic-single">
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-outline-secondary" onclick="Modificar_Oficio()">Actualizar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->

<script>

    $(document).ready(function() {
        listar_oficio();

        let img = document.querySelector("#imagen__prev_c");
        let input = document.querySelector("#txt_img_prev");
        input.addEventListener("change", () => {
            img.src = URL.createObjectURL(input.files[0]);
        });

        let img2 = document.querySelector("#imagen__prev_e");
        let input2 = document.querySelector("#txt_img_prev_edit");
        input2.addEventListener("change", () => {
            img2.src = URL.createObjectURL(input2.files[0]);
        });
    });

    var myModal = document.getElementById('modal_registro');
    var myInput = document.getElementById('txt_titulo');

    myModal.addEventListener('shown.bs.modal', function() {
        myInput.focus();
        CKEDITOR.replace('txt_desc'); // Inicializar CKEditor en el modal de registro
    });

    $('#modal_editar').on('shown.bs.modal', function(event) {
        $('.js-example-basic-single').select2({
            dropdownParent: '#modal_editar',
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
        });
        CKEDITOR.replace('txt_desc_edit'); // Inicializar CKEditor en el modal de edición
    });

    // CKEditor initialization
    CKEDITOR.replace('txt_desc');
    CKEDITOR.replace('txt_desc_edit');

    $('#txt_img_prev').on('change', function() {
        var ext = $(this).val().split('.').pop();
        if ($(this).val() != '') {
            if (ext == "png" || ext == "jpg") {
                if ($(this)[0].files[0].size > 8048576) {
                    $("#txt_img_prev").val("");
                    Swal.fire("El archivo seleccionado es demasiado pesado",
                        "<label style='color:#9B0000;'>seleccionar un archivo más liviano</label>",
                        "warning");
                }
            } else {
                $("#txt_img_prev").val("");
                Swal.fire("Mensaje de Error", "Extensión no permitida: " + ext, "error");
            }
        }
    });

    $('#txt_documento').on('change', function() {
        var ext = $(this).val().split('.').pop();
        if ($(this).val() != '') {
            if (ext == "pdf" || ext == "PDF") {
                if ($(this)[0].files[0].size > 8048576) {
                    $("#txt_img_prev").val("");
                    Swal.fire("El archivo seleccionado es demasiado pesado",
                        "<label style='color:#9B0000;'>seleccionar un archivo más liviano</label>",
                        "warning");
                }
            } else {
                $("#txt_documento").val("");
                Swal.fire("Mensaje de Error", "Extensión no permitida: " + ext, "error");
            }
        }
    });
    
</script>
