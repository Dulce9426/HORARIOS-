# 📱 Guía para Instalar la PWA - Paso a Paso

## ⚠️ IMPORTANTE: Primero necesitas generar los iconos

### Paso 1: Generar los Iconos

**Opción A: Usando el Generador HTML (MÁS FÁCIL)**

1. Abre el archivo `generate-icons.html` en tu navegador
2. Haz clic en el botón **"Generar Iconos"**
3. Espera a que aparezcan los iconos en pantalla
4. Haz clic en el botón **"Descargar Todos"**
5. Los iconos se descargarán automáticamente a tu carpeta de Descargas
6. **Copia todos los archivos `icon-*.png`** a la carpeta `C:\Users\dulce\HORARIOS`

**Opción B: Usando Node.js (si lo tienes instalado)**

```bash
npm install
npm run generate-icons
```

---

## 📲 Paso 2: Instalar la PWA en Chrome

### Para Desktop (Windows/Mac/Linux):

1. **Abre Chrome** y navega a tu archivo local:
   - Presiona `Ctrl + O` (o `Cmd + O` en Mac)
   - Navega a `C:\Users\dulce\HORARIOS\index.html`
   - Abre el archivo

2. **Busca el icono de instalación:**
   - En la barra de direcciones (URL), busca un icono de **"+"** o **"Instalar"**
   - O ve al menú de Chrome (3 puntos) → **"Instalar Reloj Mundial..."**

3. **Haz clic en "Instalar"**
   - Aparecerá un diálogo preguntando si quieres instalar la app
   - Haz clic en **"Instalar"**

4. **¡Listo!**
   - La app se abrirá en una ventana propia
   - Aparecerá un acceso directo en tu escritorio/menú de inicio

### Para Android:

1. Abre Chrome en tu Android
2. Navega a la URL donde está desplegada la app (o usa un servidor local)
3. Toca el menú (3 puntos) → **"Agregar a la pantalla de inicio"**
4. Confirma la instalación
5. La app aparecerá como un icono en tu pantalla de inicio

### Para iOS (iPhone/iPad):

1. Abre Safari (no Chrome, Safari es necesario)
2. Navega a la URL de la app
3. Toca el botón de compartir (cuadrado con flecha)
4. Selecciona **"Agregar a pantalla de inicio"**
5. Personaliza el nombre si quieres
6. Toca **"Agregar"**
7. La app aparecerá en tu pantalla de inicio

---

## 🔍 Verificar que la PWA funciona

1. Abre las **Herramientas de Desarrollador** (F12)
2. Ve a la pestaña **"Application"** (o "Aplicación")
3. En el menú lateral, verifica:
   - ✅ **Manifest**: Debe mostrar la información de la app
   - ✅ **Service Workers**: Debe mostrar "activated and is running"
   - ✅ **Storage**: Debe mostrar los archivos en caché

---

## 🐛 Solución de Problemas

### Si no aparece el botón de instalación:

1. **Verifica que los iconos estén en la carpeta:**
   - Debe haber archivos: `icon-72x72.png`, `icon-96x96.png`, etc.
   - Todos deben estar en `C:\Users\dulce\HORARIOS`

2. **Abre la consola del navegador (F12):**
   - Ve a la pestaña "Console"
   - Busca errores relacionados con el manifest o service worker

3. **Limpia la caché:**
   - Presiona `Ctrl + Shift + Delete`
   - Selecciona "Caché" y "Cookies"
   - Haz clic en "Borrar datos"
   - Recarga la página

4. **Verifica que estés usando HTTPS o localhost:**
   - Las PWAs requieren HTTPS (o localhost para desarrollo)
   - Si abres el archivo directamente (`file://`), algunas funciones pueden no funcionar
   - **Solución**: Despliega en Vercel o usa un servidor local

### Si el Service Worker no se registra:

1. Abre las herramientas de desarrollador (F12)
2. Ve a "Application" → "Service Workers"
3. Si hay errores, haz clic en "Unregister" y recarga la página
4. Verifica que `service-worker.js` esté en la misma carpeta que `index.html`

---

## 🚀 Desplegar en Vercel (Recomendado)

Para que la PWA funcione completamente, es mejor desplegarla en Vercel:

1. Sigue los pasos del README.md para desplegar en Vercel
2. Una vez desplegada, la PWA funcionará perfectamente
3. Podrás instalarla desde la URL de Vercel

---

## ✅ Checklist antes de instalar

- [ ] Los iconos están generados y en la carpeta del proyecto
- [ ] El archivo `manifest.json` existe
- [ ] El archivo `service-worker.js` existe
- [ ] La página se carga correctamente
- [ ] No hay errores en la consola del navegador (F12)

---

## 💡 Tips

- **Desktop**: La app se instalará como una aplicación independiente
- **Móvil**: La app aparecerá en tu pantalla de inicio
- **Offline**: Una vez instalada, funcionará sin conexión
- **Actualizaciones**: El Service Worker actualizará automáticamente la app

