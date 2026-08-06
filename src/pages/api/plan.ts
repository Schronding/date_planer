import type { APIRoute } from 'astro';
import { createClient } from '@libsql/client/web';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const client = createClient({
      url: import.meta.env.TURSO_DATABASE_URL,
      authToken: import.meta.env.TURSO_AUTH_TOKEN,
    });

    // En SQLite, los booleanos se manejan como 0 (false) o 1 (true)
    await client.execute({
      sql: `INSERT INTO media_planner (id, titulo, tipo, lugar, costo, url, fecha, estado, aprobado_semana)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente', 0)`,
      args: [
        data.id,
        data.titulo,
        data.tipo,
        data.lugar || null,
        data.costo || null,
        data.url || null,
        data.fecha,
      ],
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error en la inyección de datos:", error);
    return new Response(JSON.stringify({ error: 'Fallo al insertar en Turso' }), { status: 500 });
  }
};