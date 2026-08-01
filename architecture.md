# Documento de Arquitectura: Ecosistema de Gestión de Medios y Citas

## 1. Objetivos del Proyecto
*   **Accesibilidad Universal:** Desplegar una interfaz que permita a la pareja acceder a la información desde cualquier navegador móvil con conexión a internet, sin requerir instalación de software especializado ni conocimiento de Markdown.
*   **Curaduría Limitada (Sistema de Enfoque):** Implementar un sistema de listas restringidas (ej. selección semanal) para organizar la variedad de medios (videojuegos, películas, series, citas).
*   **Captura Rápida de Datos (Fricción Cero):** Contar con un método de entrada ágil y confiable para guardar instantáneamente la logística de un evento (título, fecha, lugar, costo, enlace) sobre la marcha.
*   **Sincronización Local y Soberanía de Datos:** Mantener la base de datos sincronizada hacia una bóveda local de Obsidian. Los datos deben reflejarse automáticamente en tablas Markdown limpias.
*   **Eficiencia Operativa:** Rechazar soluciones infladas de terceros (como Notion) para mantener la trifecta de simpleza, flexibilidad y eficiencia en el ecosistema personal del desarrollador.

## 2. Pila Tecnológica (Tech Stack)
*   **Frontend (Interfaz de Usuario de Consumo):**
        *   **Framework:** Astro o React.
        *   **Arquitectura:** Progressive Web App (PWA) minimalista, orientada 100% a dispositivos móviles (*mobile-first*).
        *   **Vistas:** Formulario simple ("Agregar Plan") y panel visual de los medios/citas aprobados para la semana en curso.
*   **Backend (Fuente de la Verdad):**
        *   **Infraestructura:** Supabase. Servirá para alojar la base de datos relacional y gestionar la autenticación.
*   **Motor de Ingesta (Método de Captura Rápida):**
        *   **Bot de Telegram o Endpoint en Node.js:** Interfaz de captura rápida que recibe texto o URLs desde un teléfono e inyecta la fila directamente en la base de datos de Supabase.
*   **Puente de Sincronización (La Integración con Obsidian):**
        *   **Script de Extracción:** Script ligero escrito en Node.js o Python, ejecutado desde la terminal en entorno Windows nativo.
        *   **Función:** Consultar la API de Supabase, extraer los registros de la semana, formatearlos como una tabla nativa de Markdown e inyectar/sobrescribir un archivo `.md` específico dentro de la bóveda local.

## 3. Esquema de Base de Datos Inicial (Supabase)
*   **Tabla:** `media_planner`
*   **Columnas Estructurales:**
    *   `titulo` (String)
    *   `tipo` (Categoría: película, videojuego, serie, cita)
    *   `lugar` (String - Opcional)
    *   `costo` (Número/String - Opcional)
    *   `url` (String - Enlace de referencia)
    *   `fecha` (Date/Timestamp)
    *   `estado` (String: pendiente, completado)
    *   `aprobado_semana` (Booleano: para el filtrado de la lista limitada)
