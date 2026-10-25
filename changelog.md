# Registro de Cambios — AGROEVENTO-LÁCTEO (`agroevento-landing`)

> **Proyecto:** Landing Page Oficial & Plataforma de Reserva de Stands B2B  
> **Cliente / Marca:** APROLAC (Asociación de Productores Lácteos del Estado Bolívar)   
> **Última Actualización:** 24 de Octubre de 2026  
> **Estado General:** 🟢 Operativo / Compilación 100% Exitosa  

---

## 📌 Contexto Actual y Resumen de la Última Iteración

### Prueba de Identidad Visual: Vinotinto APROLAC (`#731034`)
A solicitud del cliente, se implementó una **prueba cromática integral** transformando los colores de los **botones de acción principal, titulares destacados, badges, flechas interactivas y acentos visuales** del verde tradicional al **Vinotinto Institucional de APROLAC (`#731034`)** con estados hover en tono vinotinto profundo (`#5a0c28`).

Esta modificación se estructuró a nivel de tokens globales de Tailwind CSS v4 (`--color-aprolac-green: #731034`) y refinamiento en todos los componentes con estilos directos, logrando una atmósfera más sobria, corporativa y elegante en toda la plataforma.

---

### Iteración Previa: Transición Oficial de Expo 2026 a Expo 2027
Se realizó la transición estratégica y visual de la marca de Expo 2026 a Expo 2027, reprogramando oficialmente la fecha del evento para **del 14 al 17 de Abril de 2027** en el Eurobuilding Hotel & Suites Guayana (Puerto Ordaz). Además, se desacopló el video promocional anterior (`video-evento.mp4`) para dejar el espacio preparado con un diseño de alta gama que indica **«Próximamente»**, facilitando la integración inmediata del nuevo material audiovisual cuando sea suministrado por el cliente.

---

## 🛠️ Detalle de Cambios Realizados por Componente y Archivo

### A. Prueba Cromática: Vinotinto APROLAC (`#731034`) y Ajuste de Jerarquía Visual
* **[`components/Hero.tsx`](agroevento-landing/agroevento-landing/components/Hero.tsx):**
  * Botón principal CTA ("Contactar Asesor"): Configurado con color explícito `bg-[#731034]` y hover `#5a0c28`.
  * Titular de impacto: `text-[#731034]` en "LÁCTEOS 2027".
* **[`components/FormLinksSection.tsx`](agroevento-landing/agroevento-landing/components/FormLinksSection.tsx):**
  * **Banner de Agendar Reunión Comercial:** Migrado a fondo **vinotinto total (`bg-[#731034]`)**, eliminando cualquier degradado verde-vinotinto.
  * Botón interno "Agendar ahora": Mantiene texto en vinotinto `#731034`.
  * Tarjetas de registros oficiales: Bordes, íconos de acción y flechas de navegación actualizados a `#731034`.
* **[`components/Stand.tsx`](agroevento-landing/agroevento-landing/components/Stand.tsx):**
  * **Tarjetas Estándar:** Bordes superiores, subtítulos, checkmarks y flechas en vinotinto institucional `#731034`.
  * **Tarjeta Recomendada (VIP):** Resaltada en **Verde Aprolac (`#0E734E`)** en su badge *"Recomendado"*, borde superior, subtítulo y checkmarks, para destacar como opción recomendada.
  * **Botones de todas las tarjetas:** Todos los botones de reserva unificados a **fondo vinotinto sólido (`bg-[#731034] text-white hover:bg-[#5a0c28]`)**, garantizando consistencia total de CTA.
* **[`components/Header.tsx`](agroevento-landing/agroevento-landing/components/Header.tsx):**
  * Botón de contacto en navbar (desktop) y drawer móvil con fondo explícito `bg-[#731034]` y hover `#5a0c28`.
* **[`components/ExpoSection.tsx`](agroevento-landing/agroevento-landing/components/ExpoSection.tsx):**
  * Botón hacia el Plano Interactivo con fondo explícito `bg-[#731034]`, hover `#5a0c28` y sombra difusa `rgba(115, 16, 52, 0.3)`.
  * Pestaña activa de selección de plano en `bg-[#731034]` y botón de descarga con hover `#731034`.
* **[`components/Contact.tsx`](agroevento-landing/agroevento-landing/components/Contact.tsx):**
  * Botón de envío ("Enviar Solicitud") configurado con `bg-[#731034] text-white hover:bg-[#5a0c28]`.
* **[`components/InteractiveMap.tsx`](agroevento-landing/agroevento-landing/components/InteractiveMap.tsx):**
  * Botones de pestañas de cambio de mapa (Plano Interior / Exterior) activos en `bg-[#731034] text-white`.
* **[`components/FloatingButton.tsx`](agroevento-landing/agroevento-landing/components/FloatingButton.tsx):**
  * Botón flotante FAB principal con base `bg-[#731034]` y hover `#5a0c28`.
* **[`components/CommitmentSection.tsx`](agroevento-landing/agroevento-landing/components/CommitmentSection.tsx):**
  * Título de sección, títulos de tarjetas y números decorativos gigantes en vinotinto `#731034`.
* **[`components/ExperiencesSlider.tsx`](agroevento-landing/agroevento-landing/components/ExperiencesSlider.tsx):**
  * Título, botones circulares de navegación y paginación en `#731034`.
* **[`app/globals.css`](agroevento-landing/agroevento-landing/app/globals.css):**
  * Reestablecido el token institucional `--color-aprolac-green: #0E734E;` (Verde Aprolac) y mantenido `--color-aprolac-vinotinto: #731034;`.

---

### B. Migración de Edición 2026 a 2027 (Previa)
* **Archivo modificado:** [`components/Header.tsx`](agroevento-landing/agroevento-landing/components/Header.tsx)
  * Se sustituyó la referencia del logo anterior (`/LOGO_EXPO.png`) por el nuevo logotipo oficial de alta resolución: `/LOGO 2027 COLOR.png`.
  * Se actualizó el atributo `alt` a `Expo Logo 2027`.

### 2. Sección Hero (Pantalla Principal)
* **Archivo modificado:** [`components/Hero.tsx`](agroevento-landing/agroevento-landing/components/Hero.tsx)
  * Se actualizó el titular principal de impacto a: `LÁCTEOS 2027`.
  * Se actualizó el parámetro de texto de la URL de WhatsApp a: `...información sobre la Expo 2027`.

### 3. Sección Expo, Fechas y Cronómetro Regresivo
* **Archivo modificado:** [`components/ExpoSection.tsx`](agroevento-landing/agroevento-landing/components/ExpoSection.tsx)
  * **Titular:** Actualizado a `Expo Agro Negocios Lácteos Venezuela 2027`.
  * **Badge de Fecha:** Modificado a `Del 14 al 17 de Abril de 2027`.
  * **Cronómetro en Vivo:** Calibrado exactamente para el `14 de abril de 2027 a las 08:00 AM` (`2027-04-14T08:00:00`).
  * **Nombres de Descarga de Planos PDF:** Actualizados a `Plano_Interior_Expo_2027.pdf` y `Plano_Exterior_Expo_2027.pdf`.
  * **Video en Reconstrucción («Próximamente»):**
    * Se eliminó la etiqueta `<video>` vinculada a `video-evento.mp4`.
    * Se eliminó el componente `VideoModal` y su estado `isVideoModalOpen`.
    * Se diseñó un contenedor elegante con gradientes en la paleta institucional de APROLAC, badge animado de **Próximamente** (*"Nuevo material audiovisual en producción"*), manteniendo los textos corporativos inferiores para que la inserción del nuevo video sea directa y limpia.

### 4. Sección de Contacto y Reserva de Espacios
* **Archivo modificado:** [`components/Contact.tsx`](agroevento-landing/agroevento-landing/components/Contact.tsx)
  * En la cabecera del bloque **Reserva tu Espacio**, se actualizó el texto descriptivo a:  
    *"...gestionar patrocinios o resolver cualquier duda logística sobre la Expo 2027."*
  * Se actualizó el atributo `title` del iframe embebido de Google Maps con referencia a la Expo 2027.

### 5. Plataforma de Stands y Plano Interactivo
* **Archivos modificados:**
  * [`components/InteractiveMap.tsx`](agroevento-landing/agroevento-landing/components/InteractiveMap.tsx): Encabezado del plano interactivo actualizado a `Plano Interactivo Expo 2027`.
  * [`app/Map/page.tsx`](agroevento-landing/agroevento-landing/app/Map/page.tsx): Metadatos SEO (`title` y `description`) actualizados a 2027.

### 6. Componentes Complementarios y Footer
* **[`components/AlliesSlider.tsx`](agroevento-landing/agroevento-landing/components/AlliesSlider.tsx):** Texto alternativo (`alt`) actualizado a Expo 2027.
* **[`components/EventActivities.tsx`](agroevento-landing/agroevento-landing/components/EventActivities.tsx):** Texto alternativo (`alt`) actualizado a Expo 2027.
* **[`components/Footer.tsx`](agroevento-landing/agroevento-landing/components/Footer.tsx):** Leyenda de copyright actualizada a `© 2027 APROLAC. Todos los derechos reservados.`
* **[`components/FloatingButton.tsx`](agroevento-landing/agroevento-landing/components/FloatingButton.tsx):** Enlace directo al chat de WhatsApp corporativo actualizado con mensaje predeterminado para la Expo 2027.

### 7. SEO Global, Redes Sociales y Schemas Estructurados
* **Archivo modificado:** [`app/layout.tsx`](agroevento-landing/agroevento-landing/app/layout.tsx)
  * `title`: `1ra Expo Agro Negocios Lácteos Venezuela 2027 | APROLAC`.
  * `keywords`: Incorporada la palabra clave `agronegocios 2027`.
  * `openGraph` y `twitter`: Títulos y textos descriptivos actualizados a 2027.
  * `eventJsonLd` (Schema.org):
    * `name`: `1ra Expo Agro Negocios Lácteos Venezuela 2027`.
    * `startDate`: `2027-04-14T08:00:00-04:00`.
    * `endDate`: `2027-04-17T18:00:00-04:00`.
    * `location`: Sincronizada la sede oficial a `Eurobuilding Hotel & Suites Guayana, Puerto Ordaz, Bolívar`.

### 8. Motor de Notificaciones y Emailing (Resend + React Email)
* **Archivos modificados:**
  * [`app/api/send/route.ts`](agroevento-landing/agroevento-landing/app/api/send/route.ts): Asunto del email actualizado a `Nuevo Contacto - Expo 2027: ${motivo}`.
  * [`app/email/contactEmail.tsx`](agroevento-landing/agroevento-landing/app/email/contactEmail.tsx): Tagline corporativo actualizado a `EXPO AGRO NEGOCIOS LÁCTEOS 2027` y copyright del footer a `© 2027 APROLAC`.

### 9. Documentación y Pipeline de Build
* **[`package.json`](agroevento-landing/agroevento-landing/package.json):** Script `build` configurado con `next build --webpack` para resolver la compatibilidad de sub-exports de `@next/third-parties` en Next 16 y asegurar compilaciones infalibles.
* **[`DOCUMENTACION.md`](agroevento-landing/agroevento-landing/DOCUMENTACION.md):** Actualizadas las referencias generales a la edición 2027 y la fecha de Abril.

### 10. Armonización Cromática e Identidad Visual (Vinotinto & Verde APROLAC)
* **Objetivo:** Aplicar las directrices de color corporativo de APROLAC con precisión:
  * **Vinotinto APROLAC (`#731034`):** Color dominante para acentos, títulos clave, badges, botones estándar, íconos y estados interactivos hover.
  * **Verde APROLAC (`#0E734E`):** Destinado al stand **Comercial Premium** (nivel VIP / Recomendado).
* **Archivos y componentes ajustados:**
  * **[`components/Stand.tsx`](agroevento-landing/agroevento-landing/components/Stand.tsx):**
    * El botón del stand **Comercial Premium** (VIP) se configuró en verde APROLAC (`bg-[#0E734E] text-white border-[#0E734E] hover:bg-[#0a5c3e]`).
    * Borde superior, badge "Recomendado", subtítulo e íconos de check del plan VIP en verde APROLAC (`#0E734E`).
    * Los planes comerciales estándar mantienen sus botones en vinotinto APROLAC (`#731034` y hover `#5a0c28`).
  * **[`components/FAQ.tsx`](agroevento-landing/agroevento-landing/components/FAQ.tsx):**
    * Título de sección "Preguntas Frecuentes" en vinotinto (`text-[#731034]`).
    * Preguntas activas, estados hover y chevron animado en vinotinto (`#731034`).
  * **[`components/EventActivities.tsx`](agroevento-landing/agroevento-landing/components/EventActivities.tsx):**
    * Badge "Destacado" de actividades en vinotinto APROLAC (`bg-[#731034] text-white`).
  * **[`components/ExpoSection.tsx`](agroevento-landing/agroevento-landing/components/ExpoSection.tsx):**
    * Badge de fecha "Del 14 al 17 de Abril de 2027" en letra vinotinto con borde tenue (`text-[#731034] border-[#731034]/30`).
    * Temporizador: Minutos y etiqueta "Min" en vinotinto (`text-[#731034]`).
    * Titular: Año destacado `2027` en vinotinto (`text-[#731034]`).
    * KPIs y Estadísticas: Íconos y contenedores en vinotinto (`text-[#731034]` y `bg-[#731034]/10`).
    * Selector de planos y visor PDF con acentos y botones en vinotinto (`#731034`).
  * **[`components/Header.tsx`](agroevento-landing/agroevento-landing/components/Header.tsx):**
    * Estados `hover` de todos los ítems de navegación en escritorio y móvil en vinotinto (`hover:text-[#731034]`).
    * Línea indicadora inferior animada en vinotinto (`bg-[#731034]`).
    * Íconos del menú móvil en vinotinto al interactuar.
  * **[`components/QuienesSomos.tsx`](agroevento-landing/agroevento-landing/components/QuienesSomos.tsx):**
    * Palabra "Lácteo" en el titular principal ("Liderando el Ecosistema Agroindustrial Lácteo") en vinotinto (`text-[#731034]`).
    * Badge "Sobre APROLAC" e ícono de escudo institucional en vinotinto (`#731034`).
  * **[`components/AlliesSlider.tsx`](agroevento-landing/agroevento-landing/components/AlliesSlider.tsx):**
    * Palabra "aliados" en el título de aliados en vinotinto (`text-[#731034]`).
    * Trazo SVG curvo decorativo y badge "Alianzas Estratégicas" en vinotinto (`text-[#731034]`).
  * **[`components/ScheduleTabs.tsx`](agroevento-landing/agroevento-landing/components/ScheduleTabs.tsx):**
    * Pestaña activa, línea indicadora, borde de eventos destacados e íconos de reloj en vinotinto (`#731034`).
  * **[`components/Footer.tsx`](agroevento-landing/agroevento-landing/components/Footer.tsx):**
    * Íconos de ubicación, teléfono, email e Instagram en vinotinto (`text-[#731034]`).
    * Enlaces rápidos e interacción hover en vinotinto (`hover:text-[#731034]`).

---

## 📊 Estado Actual del Proyecto y Resultados

| Criterio | Estado | Detalle |
| :--- | :--- | :--- |
| **Salud de Compilación (`npm run build`)** | 🟢 **100% Exitoso** | Compila en ~5.0s generando todas las páginas estáticas y endpoints dinámicos sin errores. |
| **Página Principal (`/`)** | 🟢 **Activa** | Landing page completa con el nuevo logo 2027, titular 2027, fechas de abril, contador en vivo, placeholder de video y paleta armónica Vinotinto/Verde. |
| **Página del Plano (`/Map`)** | 🟢 **Activa** | Selector interactivo de stands interiores y exteriores conectado con WhatsApp. |
| **API de Email (`/api/send`)** | 🟢 **Activa** | Procesamiento transaccional mediante Resend y React Email con `replyTo` directo. |
| **Compatibilidad Móvil (Responsive)** | 🟢 **Ajustada** | Touch handling optimizado en sliders, modales y navegación móvil. |

---

## 🚀 Tareas Pendientes / Próximos Pasos

1. **Inserción del Nuevo Video Oficial:** Una vez que el equipo audiovisual entregue el nuevo archivo MP4, vincularlo en [`components/ExpoSection.tsx`](agroevento-landing/agroevento-landing/components/ExpoSection.tsx).


