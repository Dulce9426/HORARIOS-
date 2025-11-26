# Reloj Mundial - Horarios en Vivo

Página web que muestra los horarios en tiempo real de GMT, México y Nueva York con diseño estilo Ukiyo-e.

## ✨ Características

- ✅ Horarios en tiempo real (se actualizan cada segundo)
- ✅ Tres zonas horarias: GMT, México y Nueva York
- ✅ Diseño estilo Ukiyo-e (arte japonés tradicional)
- ✅ Diseño responsive y moderno
- ✅ Fecha completa en español

## 📁 Archivos del proyecto

- `index.html` - Página principal
- `styles.css` - Estilos y diseño
- `script.js` - Lógica de los relojes en vivo
- `vercel.json` - Configuración para Vercel
- `.gitignore` - Archivos ignorados por Git

## 🚀 Desplegar en Vercel - Paso a Paso

### Opción 1: Desplegar desde GitHub (Recomendado)

#### Paso 1: Subir el proyecto a GitHub

1. **Crea un repositorio en GitHub:**
   - Ve a [github.com](https://github.com) e inicia sesión
   - Haz clic en el botón "+" (arriba a la derecha) y selecciona "New repository"
   - Dale un nombre a tu repositorio (ej: "reloj-mundial")
   - Elige si será público o privado
   - **NO marques** "Initialize this repository with a README" (ya tenemos uno)
   - Haz clic en "Create repository"

2. **Conecta tu proyecto local con GitHub:**
   ```bash
   # Asegúrate de estar en la carpeta del proyecto
   cd C:\Users\dulce\HORARIOS
   
   # Agrega el repositorio remoto (reemplaza TU_USUARIO y TU_REPOSITORIO)
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   
   # Sube tu código
   git branch -M main
   git push -u origin main
   ```

#### Paso 2: Conectar con Vercel

1. **Ve a Vercel:**
   - Abre [vercel.com](https://vercel.com) en tu navegador
   - Haz clic en "Sign Up" o "Log In"
   - Inicia sesión con tu cuenta de GitHub (es más fácil)

2. **Importa tu proyecto:**
   - Haz clic en "Add New..." → "Project"
   - Selecciona el repositorio que acabas de crear
   - Haz clic en "Import"

3. **Configuración del proyecto:**
   - **Framework Preset:** Deja "Other" o "Static Site"
   - **Root Directory:** Deja en blanco (o pon `./`)
   - **Build Command:** Déjalo vacío (no necesitamos build)
   - **Output Directory:** Déjalo vacío
   - Haz clic en "Deploy"

4. **¡Listo!**
   - Vercel desplegará tu sitio automáticamente
   - En unos segundos tendrás una URL como: `tu-proyecto.vercel.app`
   - Cada vez que hagas `git push`, Vercel actualizará automáticamente tu sitio

---

### Opción 2: Desplegar directamente desde Vercel CLI

#### Paso 1: Instalar Vercel CLI

```bash
# Instala Vercel CLI globalmente
npm install -g vercel
```

#### Paso 2: Iniciar sesión en Vercel

```bash
# Ejecuta este comando en la terminal
vercel login
```

Esto abrirá tu navegador para que inicies sesión.

#### Paso 3: Desplegar

```bash
# Asegúrate de estar en la carpeta del proyecto
cd C:\Users\dulce\HORARIOS

# Despliega el proyecto
vercel

# Sigue las instrucciones:
# - Set up and deploy? Y
# - Which scope? (Selecciona tu cuenta)
# - Link to existing project? N
# - Project name? (Dale un nombre o presiona Enter)
# - Directory? (Presiona Enter para usar la carpeta actual)
# - Override settings? N
```

#### Paso 4: Desplegar a producción

```bash
# Para desplegar a producción (no solo preview)
vercel --prod
```

---

### Opción 3: Arrastrar y soltar (Más fácil pero sin Git)

1. **Ve a Vercel:**
   - Abre [vercel.com](https://vercel.com)
   - Inicia sesión o crea una cuenta

2. **Arrastra tu carpeta:**
   - En el dashboard, busca "Add New..." → "Project"
   - Arrastra la carpeta `HORARIOS` directamente a la página
   - Vercel detectará automáticamente que es un sitio estático

3. **¡Listo!**
   - Tu sitio estará en línea en segundos

**Nota:** Esta opción no tiene actualizaciones automáticas. Tendrás que volver a arrastrar la carpeta cada vez que hagas cambios.

---

## 🔧 Desarrollo Local

### Abrir en el navegador

```bash
# Opción 1: Desde la terminal
start index.html

# Opción 2: Doble clic en index.html desde el explorador de archivos
```

## 📝 Notas Importantes

- **No necesitas servidor:** Este es un sitio estático, funciona perfectamente en Vercel
- **Actualizaciones automáticas:** Si usas GitHub + Vercel, cada `git push` actualiza tu sitio
- **Dominio personalizado:** Puedes agregar tu propio dominio desde el dashboard de Vercel
- **Gratis:** Vercel tiene un plan gratuito generoso para proyectos personales

## 🎨 Estilo

Este proyecto usa un diseño inspirado en **Ukiyo-e**, el arte de grabado en madera japonés tradicional, con colores suaves y elementos decorativos elegantes.
