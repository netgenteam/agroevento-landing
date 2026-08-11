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
3. Facilitar la consulta y selección de **stands comerciales y VIP** a través de una **Plataforma Dual de Mapas Interactivos** (Plano Interior + Plano Exterior) con derivación directa por WhatsApp.
4. Mostrar un **cronómetro regresivo en vivo** programado para el inicio del evento el **14 de octubre de 2026 a las 08:00 AM**.
5. Canalizar registros de visitantes, patrocinantes, conferencistas y agendamiento de reuniones corporativas mediante formularios oficiales.

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

## 3. Configuración del Cronómetro de Conteo Regresivo (`ExpoSection.tsx`)

En [`components/ExpoSection.tsx`](file:///C:/Users/joses/agroevento/agroevento-landing/components/ExpoSection.tsx#L139):
* **Fecha Objetivo Actualizada:** `14 de octubre de 2026, 08:00:00 AM` (`2026-10-14T08:00:00`).

---

## 4. Estado de Salud del Proyecto
* **Resultado del Build (`npm run build`):**  
  `✓ Compiled successfully`
