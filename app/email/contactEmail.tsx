import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from "@react-email/components";
import * as React from "react";

// Paleta de colores basada en el proyecto
const palette = {
  guinda: "#7b113a", // aprolac-guinda
  green: "#4CAF50",  // aprolac-green
  dark: "#1f2937",   // aprolac-dark
  cream: "#fdfbf7",  // aprolac-cream
  border: "#e5e7eb",
};

interface ContactEmailProps {
  nombre: string;
  empresa?: string;
  email: string;
  motivo: string;
  mensaje: string;
}

export const ContactEmailTemplate = ({
  nombre,
  empresa,
  email,
  motivo,
  mensaje,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nuevo mensaje de contacto: {motivo}</Preview>
    <Body style={{ backgroundColor: "#f3f4f6", padding: "40px 0", fontFamily: "sans-serif" }}>
      <Container style={{ backgroundColor: "#ffffff", border: `1px solid ${palette.border}`, padding: "32px", borderRadius: "12px", maxWidth: "600px" }}>
        <Section>
          <Heading style={{ color: palette.guinda, fontSize: "24px", margin: "0 0 20px" }}>
            Nueva Solicitud de Contacto
          </Heading>
          <Text style={{ color: palette.dark, fontSize: "16px", marginBottom: "24px" }}>
            Se ha recibido un nuevo mensaje desde el formulario de contacto de la Landing Page (Expo 2026).
          </Text>
          
          <Hr style={{ borderColor: palette.border, margin: "24px 0" }} />
          
          <Section style={{ marginBottom: "24px" }}>
            <Text style={{ margin: "4px 0" }}><strong>Nombre Completo:</strong> {nombre}</Text>
            {empresa && <Text style={{ margin: "4px 0" }}><strong>Empresa / Org:</strong> {empresa}</Text>}
            <Text style={{ margin: "4px 0" }}><strong>Correo Corporativo:</strong> {email}</Text>
            <Text style={{ margin: "4px 0" }}><strong>Motivo:</strong> {motivo}</Text>
          </Section>

          <Hr style={{ borderColor: palette.border, margin: "24px 0" }} />

          <Text style={{ color: palette.dark, fontWeight: "bold", fontSize: "14px", textTransform: "uppercase" }}>
            Mensaje:
          </Text>
          <Text style={{ color: palette.dark, fontSize: "16px", margin: "8px 0", backgroundColor: palette.cream, padding: "16px", borderRadius: "8px", border: `1px solid ${palette.border}` }}>
            {mensaje}
          </Text>
        </Section>
        
        <Hr style={{ borderColor: palette.border, margin: "32px 0 24px" }} />
        <Text style={{ color: "#9ca3af", fontSize: "12px", textAlign: "center" }}>
          Este es un correo automático generado por el sistema de APROLAC.
        </Text>
      </Container>
    </Body>
  </Html>
);
