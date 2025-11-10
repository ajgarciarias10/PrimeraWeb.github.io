# Primera Web · GitHub Pages

Proyecto de sitio web estático publicado con **GitHub Pages**.

> **Origen del proyecto:** He creado esta web **a partir del curso “Mastermind – Creación de Web con Inteligencia Artificial”**.  
> **Herramienta utilizada:** El desarrollo y la organización del proyecto se han realizado con **Windsurf**.

---

## ✨ Objetivos

- Practicar el ciclo completo de creación y despliegue de una web estática.
- Aplicar lo aprendido en el curso **Mastermind – Creación de Web con IA**.
- Establecer **normas de proyecto** claras para mantener calidad y coherencia.

---

## 🧰 Stack / Herramientas

- **HTML5**, **CSS3**, **JavaScript** (vanilla)
- **Windsurf** (entorno/flujo de trabajo)
- **GitHub Pages** para el hosting
- (Opcionales) Live Server / `python -m http.server` para desarrollo local

---

## 📦 Estructura del proyecto

> _La estructura puede variar según cómo hayas organizado tu repo. Si cambias nombres de carpetas, actualiza este bloque._

- `index.html`: página principal.
- `css/styles.css`: estilos globales.
- `js/main.js`: lógica/efectos del sitio.
- `assets/`: imágenes, iconos y recursos estáticos.

---

## 🚀 Despliegue

El sitio se publica con **GitHub Pages** desde la rama `main`:

1. Ve a **Settings → Pages** en GitHub.
2. En **Build and deployment**, elige:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / carpeta `/ (root)`
3. Guarda y espera a que GitHub genere la URL del sitio.

---

## 🖥️ Desarrollo local

Opción 1 (VS Code con Live Server):
1. Instala la extensión **Live Server**.
2. Abre `index.html` y haz clic en **Go Live**.

Opción 2 (servidor simple con Python 3):
```bash
# en la carpeta del proyecto
python -m http.server 5500
# visita http://localhost:5500
