<?php
session_start();
if (isset($_SESSION['S_ID'])) {
    header('Location: view/index.php');
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta name="generator" content="Hugo 0.87.0" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta name="description" content="Portal Web del Vicerrectorado Académico">
    <title>Login | Vicerrectorado Académico</title>
    <link rel="shortcut icon" href="view/assets/img/default.png" id="icon_pestaña" />

    <!-- STYLESHEETS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./view/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="./view/assets/css/nifty.min.css">
    <link rel="stylesheet" href="./view/assets/css/demo-purpose/demo-icons.min.css">
    <link rel="stylesheet" href="./view/assets/css/demo-purpose/demo-settings.min.css">
    <link rel="stylesheet" href="./public/css/estilos.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/dataTables.bootstrap5.min.css">

    <style>
        /* Fondo dinámico */
        #background-gif {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        .bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
            z-index: -1;
        }

        /* Modo oscuro y claro */
        body {
            background-color: #f0f0f0; /* Fondo claro por defecto */
            color: #333333;
            transition: background-color 0.3s, color 0.3s;
        }

        body.dark-mode {
            background-color: #181818;
            color: #ffffff;
        }

        .content__wrap {
            border-radius: 15px;
            background: rgba(208, 206, 206, 0.85);
            padding: 40px;
            transition: background 0.3s ease;
        }

        .content__wrap.dark-mode {
            background: rgba(26, 38, 55, 0.85);
        }

        h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 28px;
            color: #2E3B55;
            font-weight: 700;
        }

        .login_letter {
            font-family: 'Poppins', sans-serif;
            color: #2E3B55;
        }

        .text_login {
            font-weight: 600;
            color: #2E3B55;
        }

        /* Estilos del logo */
        .logo-container {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo-container img {
            width: 150px;
            height: auto;
        }

        /* Botones */
        .btn-login {
            background-color: #0066cc; /* Color primario */
            transition: background-color 0.3s ease;
        }

        .btn-login:hover {
            background-color: #004c99; /* Hover más oscuro */
        }

        /* Efectos de input */
        .form-control:focus {
            border-color: #0066cc; /* Color de borde */
            box-shadow: 0 0 5px rgba(0, 102, 204, 0.7);
        }

        /* Icono para cambiar entre modo oscuro/claro */
        .theme-switcher {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
            font-size: 25px;
        }
    </style>
</head>

<body>
    <!-- Espacio para el logo -->
<div class="logo-container" style="margin-bottom: -80px;">
    <img src="../public/img/logo1.png" alt="Logo Vicerrectorado Académico" style="width: 300px; height: auto;" />
</div>



    <!-- Fondo con GIF sutil -->
    <div class="bg-overlay"></div>
    <img id="background-gif" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2piem5yNmxyemt4MG9vMjdsNHA5M3dmd21mdGsxdXprenJnN2pzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QKWb49EBsGpDXdwt41/giphy.gif" alt="Fondo GIF Educativo">

    <div class="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div class="content__wrap col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
            <h3 class="text-center login_letter text-white">VICERRECTORADO ACADÉMICO</h3>
            <!-- Card de Login -->
            <div class="card shadow-lg content2">
                <div class="card-body">
                    <div class="text-center">
                        <h1 class="h3 login_letter text_login fw-bolder text-primary">Iniciar Sesión</h1>
                        <p class="text-muted">Unidad de Gestión Académica</p>
                    </div>

                    <form class="mt-4" method="post">

                        <div class="mb-3">
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-person"></i></span>
                                <input type="text" class="form-control border_input" placeholder="Usuario" autofocus id="txt-user">
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input type="password" class="form-control border_input" placeholder="Contraseña" id="txt-pass">
                                <span class="input-group-text"><i class="bi bi-eye" id="toggle-password"></i></span>
                            </div>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember">
                            <label for="remember" class="form-check-label">
                                Recordar credenciales
                            </label>
                        </div>

                        <div class="d-grid mt-4">
                            <button class="btn btn-login btn-lg text-white" type="button" onclick="iniciar_sesion()">Ingresar</button>
                        </div>
                        <div class="mt-3">
                            <a href="../">Volver al Portal Web</a>
                        </div>

                    </form>
                </div>
            </div>
            <!-- END : Login card -->
        </div>
    </div>

    <!-- Icono de modo oscuro/claro -->
    <div class="theme-switcher" onclick="toggleTheme()">
        <i class="bi bi-moon-fill"></i>
    </div>

    <script src="https://kit.fontawesome.com/bd7b24f1e0.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="./view/assets/vendors/popperjs/popper.min.js" defer></script>
    <script src="./view/assets/vendors/bootstrap/bootstrap.min.js" defer></script>
    <script src="./view/assets/js/nifty.js" defer></script>
    <script src="./view/assets/js/demo-purpose-only.js" defer></script>
    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.4/js/dataTables.bootstrap5.min.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./public/js/usuario.js?rev=<?php echo time(); ?>"></script>

    <script>
        const rmcheck = document.getElementById('remember');
        const usuarioInput = document.getElementById('txt-user');
        const passInput = document.getElementById('txt-pass');

        if (localStorage.checkbox && localStorage.checkbox != "") {
            rmcheck.setAttribute("checked", "checked");
            usuarioInput.value = localStorage.usuario;
            passInput.value = localStorage.pass;
        } else {
            rmcheck.removeAttribute("checked");
            usuarioInput.value = "";
            passInput.value = "";
        }

        // Toggle password visibility
        document.getElementById('toggle-password').addEventListener('click', function () {
            const passField = document.getElementById('txt-pass');
            const type = passField.type === 'password' ? 'text' : 'password';
            passField.type = type;
        });

        // Función para cambiar entre modo oscuro y claro
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            document.querySelector('.content__wrap').classList.toggle('dark-mode');
        }
    </script>
    <script>
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const activeElement = document.activeElement;
            if (activeElement.id === "txt-user" || activeElement.id === "txt-pass") {
                iniciar_sesion(); // Ejecutar la función si se presiona Enter en los campos de usuario o contraseña
            }
        }
    });
</script>


</body>

</html>
