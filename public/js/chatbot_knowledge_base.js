// chatbot_knowledge_base.js

const knowledgeBase = [
    {
        keywords: ["hola", "saludos", "buenos dias", "buenas tardes", "buenas noches"],
        response: "¡Hola! Soy el asistente virtual del Vicerrectorado Académico de la UNA Puno. ¿En qué puedo ayudarte hoy?",
        quickLinks: true
    },
    {
        keywords: ["admision", "postular", "postulante", "examen"],
        response: "Para información sobre admisión, puedes visitar nuestra sección de ADMISIÓN:",
        resources: [
               {
                    type: "link",
                    title: "Portal de Admisión UNA Puno",
                    description: "Toda la información sobre exámenes de admisión e inscripciones",
                    url: "https://admision.unap.edu.pe/index",
                    icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
                    fallback: {
                        type: "externalLink",
                        url: "https://admision.unap.edu.pe"
                    }
                }
        ]
    },
    {
        keywords: ["matricula", "siscad", "carga academica"],
        response: "El proceso de matrícula se realiza a través del sistema SISCAD. Puedes acceder a través del siguiente enlace:",
        resources: [
                {
                    type: "image",
                    url: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/476927012_4182573525303817_5703051455993346807_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHGEcj_Hytf-33aOy6UgmmRfOrA6eFgK7586sDp4WArvlIiUBlc_gsnIfBDetlJNIYXO_WDTeilNYkKTW-jRdcK&_nc_ohc=2txjABjfb14Q7kNvwEPpUHy&_nc_oc=AdlM0pTNeVkOAKcen_7zlzzdoS56uhwS5mfzKoCOQqzMWy6Qnk82EnhVuM_nwgVNVXE&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=HwKnZdFa6QaEs_NDDXan_g&oh=00_AfKEH0_tcDBYvEzVzTCELARb4LHbPeFq1dRpbIrCN4q5TA&oe=6831460E", // Ruta desde la raíz del proyecto
                    alt: "Matrícula Ingresantes"
                },
                {
                    type: "image",
                    url: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/476927012_4182573525303817_5703051455993346807_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHGEcj_Hytf-33aOy6UgmmRfOrA6eFgK7586sDp4WArvlIiUBlc_gsnIfBDetlJNIYXO_WDTeilNYkKTW-jRdcK&_nc_ohc=2txjABjfb14Q7kNvwEPpUHy&_nc_oc=AdlM0pTNeVkOAKcen_7zlzzdoS56uhwS5mfzKoCOQqzMWy6Qnk82EnhVuM_nwgVNVXE&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=HwKnZdFa6QaEs_NDDXan_g&oh=00_AfKEH0_tcDBYvEzVzTCELARb4LHbPeFq1dRpbIrCN4q5TA&oe=6831460E",
                    alt: "Matricula Estudiantes"
                },
                {
                    type: "image",
                    url: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/480925829_1058386302993747_1565896092928764882_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEPdscxYWuxEeG3S6zoMRfH0ZBtHPz_DZrRkG0c_P8NmsI7IgftgYObVOtwiERqiL4A0tgG313hv6OWw7bjthUs&_nc_ohc=ZBoU4vMjwLkQ7kNvwGlvCHP&_nc_oc=AdmdjXNa_KwxKvBFT07YYrdEQDGBn19tZ0bI7hlZiL4g_o9SdBUHbrf-73tWKW-n5nQ&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=iCvP9kiIn8tPJ5FTk-kS8A&oh=00_AfLSiizcIxyzxaWkYlBe7fC1n6DP1sb0tWR_oWNkv4J9Tg&oe=68311ED7",
                    alt: "Pagos"
                },
                {
                    type: "image",
                    url: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/491357767_983872620617391_1761659780205294029_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFsosgQRjhj72Eeq4qySh1YGjo29hB4-_MaOjb2EHj786pAWYs3iJ9Zrl4H4Qrh9srMrJhMcWNk6Vb9Hp5DtveH&_nc_ohc=1xAqvtu89JwQ7kNvwHY5-7u&_nc_oc=Adl-dn91je37TZCMLPcObD3ANIO6t46yqq_9V-4rPJnjM-qzf-cWyOnPlZM6s8AsIuc&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=Xbqn0KXvNoK6KlvgcW4jpA&oh=00_AfJeHhWoVXbmkapbXdng7bSZtRbPpGYX4fTk9JScxBmC7Q&oe=683118A8",
                    alt: "Tasas Educativas"
                }
        ]
    },
    {
        keywords: ["becas", "apoyo", "economico", "ayuda"],
        response: "Para información sobre becas y apoyo económico, te recomendamos consultar con la Dirección de Bienestar Universitario.",
        resources: [
        {
                    type: "link",
                    title: "Dirección de Bienestar Universitario",
                    description: "Información sobre becas y apoyo a estudiantes",
                    url: "/becas",
                    icon: "https://cdn-icons-png.flaticon.com/512/2997/2997243.png",
                    fallback: {
                        type: "externalLink",
                        url: "https://bienestar.unap.edu.pe"
                    }
            }
        ]
    },
    {
        keywords: ["biblioteca", "libros", "lectura"],
        response: "Tenemos varias bibliotecas a tu disposición. Puedes acceder al catálogo digital desde aquí:",
        resources: [
            {
                type: "link",
                title: "Bibliotecas UNA Puno",
                description: "Acceso al catálogo digital y servicios bibliotecarios",
                url: "https://biblioteca.unap.edu.pe",
                icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            }
        ]
    },
    {
        keywords: ["contacto", "direccion", "telefono", "ubicacion"],
        response: "Puedes contactarnos en Jr. Independencia N° 1034, Puno. También puedes seguirnos en nuestras redes sociales:",
        resources: [
            {
                type: "link",
                title: "Facebook",
                description: "Vicerrectorado Académico VRA UNAP",
                url: "https://www.facebook.com/VicerrectoradoAcademicoVRAUNAP",
                icon: "https://cdn-icons-png.flaticon.com/512/174/174848.png"
            },
            {
                type: "link",
                title: "YouTube",
                description: "Canal oficial VRAUNAP",
                url: "https://www.youtube.com/@VRAUNAP",
                icon: "https://cdn-icons-png.flaticon.com/512/174/174883.png"
            },
            {
                type: "link",
                title: "TikTok",
                description: "@vicerrectorado_academico",
                url: "https://www.tiktok.com/@vicerrectorado_academico",
                icon: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
            }
        ]
    },
    {
        keywords: ["investigacion", "laboratorios", "grupos", "proyectos", "investigadores"],
        response: "Contamos con una sólida estructura para la investigación:",
        resources: [
            {
                    type: "info",
                    content: "<strong>• 42 Grupos de Investigación</strong><br><strong>• 28 Laboratorios</strong><br><strong>• 120+ Herramientas de Investigación</strong><br><strong>• 104 Investigadores RENACYT</strong>"
                },
                {
                    type: "image",
                    url: "https://www.unap.edu.pe/img/investigacion.jpg",
                    alt: "Infraestructura de investigación UNA Puno"
                }
                        
        ]
    },
    {
        keywords: ["tramites", "procedimientos", "documentos"],
        response: "Los trámites académicos y administrativos pueden realizarse a través de nuestras plataformas digitales.",
        resources: [
            {
                type: "link",
                title: "Trámites Académicos",
                description: "Sistema de trámites en línea",
                url: "https://tramites.unap.edu.pe",
                icon: "https://cdn-icons-png.flaticon.com/512/3976/3976625.png"
            },
                        
        ]
    },
        {
        keywords: ["nivelacion", "ingresantes", "nuevos alumnos"],
        response: "Para información sobre el programa de nivelación para ingresantes, puedes visitar:"  ,
        resources: [
            {
                    type: "link",
                    title: "NIVELACIÓN INGRESANTES",
                    description: "Programa especial para estudiantes de nuevo ingreso",
                    url: "https://nivelacioningresante.unap.edu.pe/",
                    icon: "https://cdn-icons-png.flaticon.com/512/3976/3976625.png",
                    fallback: {
                        type: "externalLink",
                        url: "https://vra.unap.edu.pe/noticias"
                    }
                }
                        
        ]
    },
    {
        keywords: ["cursos", "certificados", "capacitacion","diplomados"],
        response: "Puedes encontrar información sobre cursos y certificados en nuestra sección especializada:"  ,
        resources: [
            {
                    type: "link",
                    title: "CURSOS Y CERTIFICADOS",
                    description: "Información de cursos disponibles y obtención de certificados",
                    url: "convocatorias", // Cambiado de "/capacitaciones" a "/convocatorias"
                    icon: "https://cdn-icons-png.flaticon.com/512/2997/2997243.png",
                    fallback: {
                        type: "image",
                        url: "https://www.unap.edu.pe/img/cursos-banner.jpg",
                        description: "Banner de cursos disponibles"
                    }
                }
                        
        ]
    },
        {
        keywords: ["universidad", "sitio web", "pagina oficial"],
        response: "Puedes visitar nuestro sitio web oficial o algunos sitios relacionados:"  ,
        resources: [
            {
                    type: "link",
                    title: "Sitio Web Oficial UNA Puno",
                    description: "Portal principal de la Universidad Nacional del Altiplano",
                    url: "https://www.unap.edu.pe",
                    icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                },
                {
                    type: "link",
                    title: "Ministerio de Educación",
                    description: "Sitio oficial del Ministerio de Educación del Perú",
                    url: "https://www.gob.pe/minedu",
                    icon: "https://cdn-icons-png.flaticon.com/512/2997/2997243.png"
                }
                        
        ]
    },
    {
        keywords: ["diplomados", "vra"],
        response: "Información sobre los diplomados del Vicerrectorado Académico la encontrarás aquí:"  ,
        resources: [
            {
                    type: "link",
                    title: "DIPLOMADOS VRA",
                    description: "Información sobre diplomados del Vicerrectorado Académico",
                    url: "/diplomados",
                    icon: "https://cdn-icons-png.flaticon.com/512/4207/4207253.png",
                    fallback: {
                        type: "image",
                        url: "https://www.unap.edu.pe/img/diplomados-vra.jpg",
                        description: "Información de diplomados VRA"
                    }
                }
                        
        ]
    },
    {
        keywords: ["carreras Profesionales", "carreras", "Profesiones", "Escuelas profesiones", "facultades", "Programas"],
        response: "La UNA Puno ofrece 30 carreras profesionales distribuidas en 11 facultades. Contamos con:"  ,
        resources: [
            {
                    type: "info",
                    content: "<strong>Facultades:</strong> 11<br><strong>Carreras Profesionales:</strong> 30<br><strong>Grupos de Investigación:</strong> 42<br><strong>Laboratorios:</strong> 28<br><strong>Investigadores RENACYT:</strong> 104"
                },
                {
                    type: "link",
                    title: "Ver Carreras Profesionales",
                    description: "Listado completo de carreras ofrecidas",
                    url: "escuelasprofesionales",
                    icon: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
                    fallback: {
                        type: "image",
                        url: "https://www.unap.edu.pe/img/facultades-carreras.jpg",
                        description: "Mapa de facultades y carreras UNA Puno"
                    }
                }
                        
        ]
    },
    {
        keywords: ["tesis", "trabajo", "investigacion", "grado"],
        response: "Para información sobre el proceso de tesis, puedes consultar con tu Facultad o la Dirección de Gestión Académica."  ,
        resources: [
            {
                    type: "link",
                    title: "Dirección de Gestión Académica",
                    description: "Información sobre tesis y trabajos de investigación",
                    url: "/tesis",
                    icon: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
                    fallback: {
                        type: "externalLink",
                        url: "https://vra.unap.edu.pe/gestion-academica"
                    }
            }
                        
        ]
    },
    {
        keywords: ["calendario", "academico", "fechas"],
        response: "El calendario académico actualizado se encuentra disponible en la sección de documentos del Vicerrectorado Académico."  ,
        resources: [
            {
                    type: "link",
                    title: "Calendario Académico",
                    description: "Fechas importantes del año académico",
                    url: "/calendario",
                    icon: "https://cdn-icons-png.flaticon.com/512/4207/4207253.png",
                    fallback: {
                        type: "image",
                        url: "https://www.unap.edu.pe/img/calendario-academico.jpg",
                        description: "Calendario académico UNA Puno"
                    }
            }
                        
        ]
    },
    {
        keywords: ["gracias", "agradecido", "agradezco"],
        response: "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
        quickLinks: true
    },
    {
        keywords: ["adios", "hasta luego", "chau"],
        response: "¡Hasta luego! Gracias por usar nuestro asistente virtual. ¡Que tengas un buen día!"
    }
];
