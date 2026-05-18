import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/app/email/contactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, empresa, email, motivo, mensaje } = body;

    // Validación básica de campos requeridos
    if (!nombre || !email || !motivo || !mensaje) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "APROLAC Contacto <onboarding@resend.dev>",
      to: [process.env.EMAIL_RECIPIENT || "netgenteam@gmail.com"],
      subject: `Nuevo Contacto - Expo 2026: ${motivo}`,
      react: ContactEmailTemplate({ nombre, empresa, email, motivo, mensaje }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "SUCCESS", id: data?.id });
  } catch (err) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
