# RC Cars - Chauffeur & Luxury VTC Web Application

Bienvenido al proyecto web de **RC Cars** (Servicio Exclusivo de Chófer Privado y Transfers VTC).

---

## 🚀 Cómo abrir y probar la web ahora mismo en tu Mac
1. Ve a la carpeta `Projectos de paginas webs/RC Cars` en tu Finder.
2. Haz **doble clic en el archivo `index.html`** (o clic derecho > *Abrir con* > Google Chrome / Safari).
3. ¡Listo! La web cargará instantáneamente en tu navegador con todas las animaciones, catálogo interactivo y funciones activas.

---

## ✨ Funcionalidades Incluidas

1. **Calculador & Widget de Reserva (Hero)**:
   - Alternancia entre **"Punto a Punto"** y **"Por Horas / Disposición"**.
   - Acceso rápido a presets (Aeropuerto T4, Centro Ciudad).
   - Selector de fecha, hora, número de pasajeros y maletas.
   - Cálculo automático de distancias y tarifas estimadas en tiempo real.

2. **Mapa de Ruta Interactivo (Leaflet.js)**:
   - Ventana modal con mapa interactivo y trazado de ruta con paradas.

3. **Catálogo de Flota de Lujo**:
   - Categorías: **Business** (Mercedes Clase E / Audi A6), **First Class VIP** (Mercedes Clase S / BMW Serie 7), **Minivan VIP** (Mercedes Clase V Extra Larga) y **100% Eléctrico** (Tesla Model S).
   - Fichas completas con especificaciones: capacidad de pasajeros, maletas XL, amenities (WiFi, agua de cortesía, chófer con etiqueta).
   - Filtros instantáneos por categoría.

4. **Flujo de Checkout y Reserva Completo**:
   - Modal de reserva paso a paso.
   - Datos del pasajero y número de vuelo/tren para seguimiento en tiempo real.
   - Extras configurables (sillas de bebé homologadas, catering premium).
   - Selección de método de pago (Tarjeta online segura tipo Stripe, pago directo al chófer o facturación mensual B2B).
   - Generación de código localizador (ej. `#RC-84920`) y voucher oficial listo para imprimir.

5. **Panel de Gestión / Administración Local**:
   - Haz clic en **"Área Gestión"** (en la barra superior o en el pie de página).
   - Permite visualizar todas las reservas realizadas, nombres de clientes, trayectos contratados y estados.
   - Almacenamiento automático en el navegador (`localStorage`).

6. **Secciones de Conversión & Confianza**:
   - Servicios VIP (Aeropuertos con Meet & Greet, Empresas, Bodas y Eventos).
   - Estadísticas de flota auditada.
   - Testimonios y opiniones con estrellas.
   - Preguntas frecuentes (FAQ) interactivas desplegables.
   - Acceso directo y botón flotante de **WhatsApp** para atención inmediata.

---

## 🌐 Próximos Pasos: Hosting, Dominios y WordPress

Respecto a tus dudas sobre dónde alojar la web de forma profesional:

1. **¿Por qué no GitHub?**: 
   - Tienes toda la razón: GitHub Pages está pensado para documentación o proyectos personales de código abierto y muestra un subdominio `.github.io`. Para una empresa de chófer VIP se necesita una presencia 100% corporativa.

2. **Hosting Profesional & Dominio Propio** (ej: `rccars.es` o `rctransfers.com`):
   - **Opción recomendada (Rápida y económica)**: Subir estos mismos archivos a un hosting profesional como **Hostinger**, **SiteGround** o **Cloudflare Pages / Vercel** (con tu dominio personalizado y certificado SSL de seguridad). Carga en menos de 1 segundo y no requiere mantenimiento de bases de datos.
   - **Opción WordPress**: Si en el futuro prefieres gestionarlo todo desde el panel de WordPress, se puede instalar un plugin de reservas como *Chauffeur Booking System* o *Amelia*, utilizando el mismo diseño y estilo visual que acabamos de crear.

