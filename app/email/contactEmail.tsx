import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  nombre: string;
  empresa?: string;
  email: string;
  motivo: string;
  mensaje: string;
}

// Colores de marca APROLAC
const palette = {
  brand: "#0F4A32",    // Verde Bosque
  accent: "#0E734E",   // Verde Brillante
  guinda: "#731034",   // Guinda
  dark: "#231F20",     // Texto principal
  light: "#666666",    // Texto secundario
  cream: "#FBFBF9",    // Fondo sutil
  white: "#ffffff",
  border: "#E5E7EB",
};

export const ContactEmailTemplate = ({
  nombre,
  empresa,
  email,
  motivo,
  mensaje,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>APROLAC: Nueva consulta de {nombre}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo Area */}
          <Section style={header}>
            <Text style={logo}>APROLAC</Text>
            <Text style={tagline}>EXPO AGRO NEGOCIOS LÁCTEOS 2026</Text>
          </Section>

          {/* Hero Section */}
          <Section style={content}>
            <Heading style={h1}>Nueva Solicitud de Contacto</Heading>
            <Text style={paragraph}>
              Se ha registrado un nuevo interés desde el portal oficial. A continuación los detalles del contacto:
            </Text>

            {/* Info Card */}
            <Section style={card}>
              <Row style={row}>
                <Column style={iconColumn}>
                  <Text style={emojiIcon}>👤</Text>
                </Column>
                <Column>
                  <Text style={label}>NOMBRE COMPLETO</Text>
                  <Text style={value}>{nombre}</Text>
                </Column>
              </Row>

              {empresa && (
                <Row style={row}>
                  <Column style={iconColumn}>
                    <Text style={emojiIcon}>🏢</Text>
                  </Column>
                  <Column>
                    <Text style={label}>EMPRESA / ORGANIZACIÓN</Text>
                    <Text style={value}>{empresa}</Text>
                  </Column>
                </Row>
              )}

              <Row style={row}>
                <Column style={iconColumn}>
                  <Text style={emojiIcon}>📧</Text>
                </Column>
                <Column>
                  <Text style={label}>CORREO ELECTRÓNICO</Text>
                  <Link href={`mailto:${email}`} style={link}>{email}</Link>
                </Column>
              </Row>

              <Row style={row}>
                <Column style={iconColumn}>
                  <Text style={emojiIcon}>📌</Text>
                </Column>
                <Column>
                  <Text style={label}>MOTIVO DE CONSULTA</Text>
                  <Text style={value}>{motivo}</Text>
                </Column>
              </Row>
            </Section>

            {/* Message Block */}
            <Section style={messageContainer}>
              <Text style={label}>MENSAJE RECIBIDO:</Text>
              <Section style={messageBox}>
                <Text style={messageText}>{mensaje}</Text>
              </Section>
            </Section>

            <Text style={footerText}>
              Este mensaje fue enviado automáticamente desde el formulario de contacto de agronegocioslacteos.com
            </Text>
          </Section>

          {/* Footer Branding */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerCopyright}>
              © 2026 APROLAC. Todos los derechos reservados. <br />
              Bolívar, Venezuela.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmailTemplate;

// --- Styles ---

const main = {
  backgroundColor: "#f4f7f6",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "40px auto",
  padding: "0",
  width: "580px",
  backgroundColor: palette.white,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};

const header = {
  backgroundColor: palette.brand,
  padding: "32px",
  textAlign: "center" as const,
};

const logo = {
  color: palette.white,
  fontSize: "28px",
  fontWeight: "800",
  letterSpacing: "4px",
  margin: "0",
  lineHeight: "1",
};

const tagline = {
  color: palette.accent,
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "8px 0 0",
  textTransform: "uppercase" as const,
};

const content = {
  padding: "40px 48px",
};

const h1 = {
  color: palette.dark,
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "left" as const,
  margin: "0 0 16px",
};

const paragraph = {
  color: palette.light,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 32px",
};

const card = {
  backgroundColor: palette.cream,
  padding: "24px",
  borderRadius: "12px",
  border: `1px solid ${palette.border}`,
  marginBottom: "32px",
};

const row = {
  marginBottom: "16px",
};

const iconColumn = {
  width: "40px",
};

const emojiIcon = {
  fontSize: "20px",
  margin: "0",
};

const label = {
  color: palette.light,
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1px",
  margin: "0 0 4px",
  textTransform: "uppercase" as const,
};

const value = {
  color: palette.dark,
  fontSize: "15px",
  fontWeight: "500",
  margin: "0",
};

const link = {
  color: palette.accent,
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
};

const messageContainer = {
  marginBottom: "32px",
};

const messageBox = {
  backgroundColor: palette.white,
  borderLeft: `4px solid ${palette.brand}`,
  padding: "16px 24px",
  marginTop: "8px",
  borderRadius: "4px 12px 12px 4px",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.02)",
};

const messageText = {
  color: palette.dark,
  fontSize: "15px",
  lineHeight: "24px",
  fontStyle: "italic",
  margin: "0",
};

const footerText = {
  color: "#a1a1a1",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "0",
};

const footer = {
  padding: "0 48px 40px",
};

const hr = {
  borderColor: "#f0f0f0",
  margin: "0 0 20px",
};

const footerCopyright = {
  color: "#b1b1b1",
  fontSize: "11px",
  textAlign: "center" as const,
  lineHeight: "18px",
};
