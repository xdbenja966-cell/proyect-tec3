
document.addEventListener("DOMContentLoaded", async function () {

  // Carga el encabezado y el pie de página.
  async function cargarComponente(id, archivo) {
    const contenedor = document.getElementById(id);

    if (!contenedor) return;

    try {
      const respuesta = await fetch(archivo);

      if (!respuesta.ok) {
        throw new Error("No se pudo cargar " + archivo);
      }

      contenedor.innerHTML = await respuesta.text();

    } catch (error) {
      console.error(error);

      contenedor.innerHTML =
        '<p class="component-error">No se pudo cargar el componente. Abrí el proyecto con Live Server en VS Code.</p>';
    }
  }

  await Promise.all([
    cargarComponente("header-placeholder", "header.html"),
    cargarComponente("footer-placeholder", "footer.html")
  ]);


  // Marca la página actual en el encabezado.
  const archivoActual = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a[data-page]").forEach(function (enlace) {
    if (enlace.dataset.page === archivoActual) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });


  // Menú principal del encabezado.
  const botonMenu = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");
  const botonNosotros = document.getElementById("nosotros-menu");

  // Función compartida para abrir y cerrar el menú.
  function cambiarMenu() {
    if (!menu) return;

    const abierto = menu.classList.toggle("open");

    if (botonMenu) {
      botonMenu.setAttribute("aria-expanded", String(abierto));

      botonMenu.innerHTML = abierto
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    }

    if (botonNosotros) {
      botonNosotros.setAttribute("aria-expanded", String(abierto));
    }
  }

  // Botón hamburguesa del encabezado.
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", cambiarMenu);
  }

  // Botón hamburguesa de la sección Nosotros.
  if (botonNosotros && menu) {
    botonNosotros.addEventListener("click", cambiarMenu);
  }

  // Cierra el menú al seleccionar una página.
  if (menu) {
    menu.querySelectorAll("a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        menu.classList.remove("open");

        if (botonMenu) {
          botonMenu.setAttribute("aria-expanded", "false");
          botonMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }

        if (botonNosotros) {
          botonNosotros.setAttribute("aria-expanded", "false");
        }
      });
    });
  }


  // Cambia entre planta baja y primer piso.
  const botonesMapa = document.querySelectorAll(".tab-btn[data-map]");
  const panelesMapa = document.querySelectorAll(".map-panel");

  botonesMapa.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const id = boton.dataset.map;

      botonesMapa.forEach(function (otro) {
        const activo = otro === boton;

        otro.classList.toggle("active", activo);
        otro.setAttribute("aria-pressed", String(activo));
      });

      panelesMapa.forEach(function (panel) {
        panel.classList.toggle("active", panel.id === id);
      });
    });
  });


  // Galería: abre las imágenes en grande.
  document.querySelectorAll(".lightbox-gallery img").forEach(function (imagen) {
    imagen.addEventListener("click", function () {
      const fondo = document.createElement("div");

      fondo.className = "lightbox";
      fondo.setAttribute("role", "dialog");
      fondo.setAttribute("aria-label", "Imagen ampliada");

      const grande = document.createElement("img");

      grande.src = imagen.src;
      grande.alt = imagen.alt || "Imagen ampliada";

      fondo.appendChild(grande);
      document.body.appendChild(fondo);

      function cerrar() {
        fondo.remove();
        document.removeEventListener("keydown", teclaEscape);
      }

      function teclaEscape(evento) {
        if (evento.key === "Escape") {
          cerrar();
        }
      }

      fondo.addEventListener("click", cerrar);
      document.addEventListener("keydown", teclaEscape);
    });
  });


  // Formulario de inscripción de demostración.
  // No guarda ni envía información.
  const formulario = document.querySelector(".inscription-form");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      alert(
        "El formulario de muestra funciona visualmente, pero todavía no está conectado para enviar datos a la escuela."
      );
    });
  }

});
