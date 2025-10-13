function ver_documento(id){
    $.ajax({
        url: "controller/web_controller_traer_documento.php",
        type: 'POST',
        data: {
            id: id
        }
    }).done(function (resp) {
        data = JSON.parse(resp);

        document.getElementById('principal_title').innerHTML = data[0]['com_titulo'];
        document.getElementById('titulo_com').innerHTML = data[0]['com_titulo'];

        // Limpiamos las etiquetas HTML y decodificamos las entidades HTML en la descripción antes de mostrar el texto
        document.getElementById('descripcion_com').innerHTML = convertirLinks(decodeHtml(data[0]['com_descripcion']));

        document.getElementById('fecha_com').innerHTML = Calcular_Fecha(data[0]['com_feccreacion']);
        
        // Verificar si el documento existe
        const documento = data[0]['com_documento'];
        
        // Si existe el documento, mostrar el botón de descarga
        if (documento) {
            document.getElementById('document_link').href = "admin/" + documento;
            document.getElementById('document_link').download = data[0]['com_titulo'];
            document.getElementById('document_link').style.display = 'inline-block'; // Mostrar el botón
        } else {
            // Si no existe el documento, ocultar el botón de descarga
            document.getElementById('document_link').style.display = 'none'; // Ocultar el botón
        }
        
        // Vista previa de la imagen
        document.getElementById('vista_previa').src = "admin/" + data[0]['com_imgprev'];

        // Verificar si la vista previa está disponible
        verficar_datos_doc();
    });
}


function verficar_datos_doc() {
    let caja = document.getElementById("box__all_document");
    let imagen = document.getElementById("vista_previa");
    
    // Si la imagen no está disponible, ocultamos la sección que la contiene
    if (imagen.src == "" || imagen.src == null) {
        caja.style.display = "none";  // Ocultamos el contenedor de la imagen
    } else {
        caja.style.display = "flex";  // Mostramos el contenedor de la imagen
    }
}

function convertirLinks(texto) {
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    return texto.replace(urlRegex, function(url) {
        // Convertir el enlace a minúsculas
        const linkLower = url.toLowerCase();
        return `<a href="${linkLower}" target="_blank" style="color: #007bff; text-decoration: underline;">${url}</a>`;
    });
}

// Función para eliminar las etiquetas HTML y decodificar las entidades HTML
function decodeHtml(texto) {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = texto;
    return textarea.value;
}

function Calcular_Fecha(fechahora) {
    let fecha = new Date(fechahora);
    let fecha2 = fecha.toLocaleDateString();
    let fechaArray = fecha2.split('/');
    let dia = fechaArray[0];
    let mes = fechaArray[1];
    let anio = fechaArray[2];
    let mesLetra = "";

    if (dia.length < 2) {
        dia = '0' + dia;
    }
    if (mes.length < 2) {
        mes = '0' + mes;
    }

    switch (mes) {
        case '01': mesLetra = "Enero"; break;
        case '02': mesLetra = "Febrero"; break;
        case '03': mesLetra = "Marzo"; break;
        case '04': mesLetra = "Abril"; break;
        case '05': mesLetra = "Mayo"; break;
        case '06': mesLetra = "Junio"; break;
        case '07': mesLetra = "Julio"; break;
        case '08': mesLetra = "Agosto"; break;
        case '09': mesLetra = "Setiembre"; break;
        case '10': mesLetra = "Octubre"; break;
        case '11': mesLetra = "Noviembre"; break;
        case '12': mesLetra = "Diciembre"; break;
    }

    return dia + ' ' + mesLetra + ' ' + anio;
}
