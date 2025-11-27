// Variable global para formato de hora
let use24HourFormat = true;

// Traducir días y meses al español
function translateToSpanish(dateString) {
    const translations = {
        'Monday': 'Lunes',
        'Tuesday': 'Martes',
        'Wednesday': 'Miércoles',
        'Thursday': 'Jueves',
        'Friday': 'Viernes',
        'Saturday': 'Sábado',
        'Sunday': 'Domingo',
        'January': 'Enero',
        'February': 'Febrero',
        'March': 'Marzo',
        'April': 'Abril',
        'May': 'Mayo',
        'June': 'Junio',
        'July': 'Julio',
        'August': 'Agosto',
        'September': 'Septiembre',
        'October': 'Octubre',
        'November': 'Noviembre',
        'December': 'Diciembre'
    };
    
    let translated = dateString;
    Object.keys(translations).forEach(eng => {
        translated = translated.replace(eng, translations[eng]);
    });
    
    return translated;
}

function getTimeInTimeZone(timeZone, use24Hour = true) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24Hour,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });
    
    const parts = formatter.formatToParts(now);
    const timeObj = {};
    parts.forEach(part => {
        timeObj[part.type] = part.value;
    });
    
    const dateString = `${timeObj.weekday} ${timeObj.day} de ${timeObj.month}, ${timeObj.year}`;
    
    // Formatear hora según el formato seleccionado
    let timeString;
    if (use24Hour) {
        timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
    } else {
        const ampm = timeObj.dayPeriod || '';
        timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second} ${ampm}`.trim();
    }
    
    return {
        time: timeString,
        date: translateToSpanish(dateString)
    };
}

function updateClocks() {
    // GMT
    const gmt = getTimeInTimeZone('Europe/London', use24HourFormat);
    document.getElementById('gmt-time').textContent = gmt.time;
    document.getElementById('gmt-date').textContent = gmt.date;

    // México
    const mexico = getTimeInTimeZone('America/Mexico_City', use24HourFormat);
    document.getElementById('mexico-time').textContent = mexico.time;
    document.getElementById('mexico-date').textContent = mexico.date;

    // Nueva York
    const ny = getTimeInTimeZone('America/New_York', use24HourFormat);
    document.getElementById('ny-time').textContent = ny.time;
    document.getElementById('ny-date').textContent = ny.date;
}

// Función para convertir entre zonas horarias
function convertTimeZone() {
    const dateInput = document.getElementById('converter-date').value;
    const fromZone = document.getElementById('from-zone').value;
    const toZone = document.getElementById('to-zone').value;
    
    if (!dateInput) {
        // Si no hay fecha, usar la hora actual
        const now = new Date();
        const fromTime = new Date(now.toLocaleString('en-US', { timeZone: fromZone }));
        const toTime = new Date(now.toLocaleString('en-US', { timeZone: toZone }));
        
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: toZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !use24HourFormat,
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
        
        const parts = formatter.formatToParts(toTime);
        const timeObj = {};
        parts.forEach(part => {
            timeObj[part.type] = part.value;
        });
        
        let timeString;
        if (use24HourFormat) {
            timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
        } else {
            const ampm = timeObj.dayPeriod || '';
            timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second} ${ampm}`.trim();
        }
        
        const dateString = `${timeObj.weekday} ${timeObj.day} de ${timeObj.month}, ${timeObj.year}`;
        
        document.getElementById('converter-result').textContent = timeString;
        document.getElementById('converter-date-result').textContent = translateToSpanish(dateString);
        return;
    }
    
    // Convertir la fecha ingresada
    const localDate = new Date(dateInput);
    
    // Crear fecha en la zona de origen
    const fromDate = new Date(localDate.toLocaleString('en-US', { timeZone: fromZone }));
    
    // Convertir a la zona destino
    const toDate = new Date(fromDate.toLocaleString('en-US', { timeZone: toZone }));
    
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24HourFormat,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });
    
    const parts = formatter.formatToParts(toDate);
    const timeObj = {};
    parts.forEach(part => {
        timeObj[part.type] = part.value;
    });
    
    let timeString;
    if (use24HourFormat) {
        timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
    } else {
        const ampm = timeObj.dayPeriod || '';
        timeString = `${timeObj.hour}:${timeObj.minute}:${timeObj.second} ${ampm}`.trim();
    }
    
    const dateString = `${timeObj.weekday} ${timeObj.day} de ${timeObj.month}, ${timeObj.year}`;
    
    document.getElementById('converter-result').textContent = timeString;
    document.getElementById('converter-date-result').textContent = translateToSpanish(dateString);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Toggle para formato 12H/24H
    const formatToggle = document.getElementById('format-toggle');
    const toggleLabel = document.querySelector('.toggle-label');
    
    formatToggle.addEventListener('change', (e) => {
        use24HourFormat = e.target.checked;
        toggleLabel.textContent = use24HourFormat ? '24H' : '12H';
        updateClocks();
        convertTimeZone(); // Actualizar también el conversor
    });
    
    // Inicializar label del toggle
    toggleLabel.textContent = use24HourFormat ? '24H' : '12H';
    
    // Event listeners para el conversor
    document.getElementById('converter-date').addEventListener('change', convertTimeZone);
    document.getElementById('from-zone').addEventListener('change', convertTimeZone);
    document.getElementById('to-zone').addEventListener('change', convertTimeZone);
    
    // Inicializar conversor con hora actual
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('converter-date').value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Actualizar inmediatamente al cargar la página
    updateClocks();
    convertTimeZone();
    
    // Actualizar cada segundo para que sea en vivo
    setInterval(() => {
        updateClocks();
        if (!document.getElementById('converter-date').value) {
            convertTimeZone();
        }
    }, 1000);
});

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado exitosamente:', registration.scope);
      })
      .catch((error) => {
        console.log('Error al registrar Service Worker:', error);
      });
  });
}
