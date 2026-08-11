# Documentación Completa del Proyecto — Expo Agro Negocios Lácteos 2026

> **Cliente / Marca:** APROLAC (Asociación de Productores Lácteos del Estado Bolívar)  
> **Proyecto:** Landing Page Oficial & Plataforma de Reserva de Stands (`agroevento-landing`)  
> **Desarrollado por:** NetGen  
> **Última Actualización:** Agosto 2026  

---

## 1. Visión General del Proyecto

`agroevento-landing` es una plataforma web moderna, interactiva y de alta conversión diseñada para la **1ra Expo Agro Negocios Lácteos Venezuela 2026**, organizada por **APROLAC**.

El objetivo principal de la aplicación es:
1. Posicionar el evento B2B líder de la industria láctea venezolana.
2. Presentar la agenda, actividades, ejes estratégicos y respaldo institucional de APROLAC.
3. Presentar los tipos de stands comerciales en un **Slider Infinito (`Stand.tsx`)** sin puntos en móvil y con flechas + contador numérico (`1 / 5`) posicionados en la parte inferior.
4. Incluir un **Visor de Planos PDF Deslizable (`ExpoSection.tsx`)** con tipografía compacta en los tabs en móvil (`text-[10px]`) y flechas laterales ocultas en móvil (`hidden md:flex`).
5. Facilitar la consulta y selección de **stands comerciales y VIP** a través de una **Plataforma Dual de Mapas Interactivos** (Plano Interior + Plano Exterior) con transiciones suaves en cambio de pestañas.
6. Mostrar un **cronómetro regresivo en vivo** programado para el **14 de octubre de 2026 a las 08:00 AM**.
7. Canalizar registros de visitantes y contactos hacia **`info.agronegocioslacteos@gmail.com`** con respuesta directa mediante la cabecera `replyTo`.

---

## 2. Stack Tecnológico

| Capa / Dominio | Tecnología / Librería | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework Base** | [Next.js](https://nextjs.org/) (App Router) | `16.2.4` | Server Components, SSG, Routing y API Routes |
| **Biblioteca UI** | [React](https://react.dev/) | `19.2.4` | Biblioteca de interfaz de usuario |
| **Lenguaje** | TypeScript | `^5` | Tipado estático estricto |
| **Estilos CSS** | [Tailwind CSS](https://tailwindcss.com/) v4 | `^4.0.0` | Utility-first styling con `@theme` CSS |
| **Procesador CSS** | PostCSS / `@tailwindcss/postcss` | `^4` | Procesamiento de estilos modernos |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/) | `^12.38.0` | Transiciones fluidas, microinteracciones y modales |
| **Animaciones Avanzadas**| [GSAP](https://gsap.com/) | `^3.15.0` | Animaciones complejas y scroll effects |
| **Iconografía** | Lucide React & Iconify | `^1.14` / `^6.0` | Íconos vectoriales SVG limpios |
| **Emailing & API** | Resend & React Email | `^6.12` / `^1.0` | Envío de correos transaccionales desde el formulario |

---

## 3. Ajustes de Interfaz Móvil (`Stand.tsx` & `ExpoSection.tsx`)

* **Sección de Stands (`Stand.tsx`):**
  * Se ocultaron los puntos de paginación en móvil (`hidden sm:flex`).
  * Se posicionaron las flechas de navegación y el contador numérico de stands (`1 / 5`) en la parte inferior (`flex sm:hidden`).
* **Sección de Planos PDF (`ExpoSection.tsx`):**
  * Reducción de la tipografía de los botones de pestañas en móvil a `text-[10px] sm:text-xs md:text-sm`.
  * Se ocultaron las flechas laterales de navegación en dispositivos móviles (`hidden md:flex`).

---

## 4. Estado de Salud del Proyecto
* **Resultado del Build (`npm run build`):**  
  `✓ Compiled successfully in 3.8s`
