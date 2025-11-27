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
    document.getElementById('converter-date').addEventListener('change', () => {
        convertTimeZone();
        updateAllZones();
    });
    document.getElementById('from-zone').addEventListener('change', convertTimeZone);
    document.getElementById('to-zone').addEventListener('change', convertTimeZone);
    
    // Botones rápidos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const fromZone = btn.getAttribute('data-from');
            const toZone = btn.getAttribute('data-to');
            document.getElementById('from-zone').value = fromZone;
            document.getElementById('to-zone').value = toZone;
            convertTimeZone();
        });
    });
    
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
    
    // Función para actualizar todas las zonas
    function updateAllZones() {
        const dateInput = document.getElementById('converter-date').value;
        const fromZone = document.getElementById('from-zone').value;
        
        let targetDate;
        
        if (dateInput) {
            // Si hay una fecha ingresada, interpretarla como si fuera en la zona de origen
            const localDate = new Date(dateInput);
            // Crear una fecha que represente ese momento en la zona de origen
            const dateString = localDate.toISOString().slice(0, 16);
            targetDate = new Date(dateString);
        } else {
            // Si no hay fecha, usar la hora actual
            targetDate = new Date();
        }
        
        const zones = [
            { id: 'all-mexico', zone: 'America/Mexico_City', name: 'México' },
            { id: 'all-ny', zone: 'America/New_York', name: 'Nueva York' },
            { id: 'all-gmt', zone: 'Europe/London', name: 'GMT' }
        ];
        
        zones.forEach(({ id, zone }) => {
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: zone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !use24HourFormat,
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });
            
            // Si hay una fecha ingresada, necesitamos convertirla correctamente
            let dateToFormat = targetDate;
            if (dateInput) {
                // Convertir la fecha de la zona de origen a la zona destino
                const fromFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: fromZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                
                const fromParts = fromFormatter.formatToParts(targetDate);
                const fromTime = {
                    year: fromParts.find(p => p.type === 'year').value,
                    month: fromParts.find(p => p.type === 'month').value,
                    day: fromParts.find(p => p.type === 'day').value,
                    hour: fromParts.find(p => p.type === 'hour').value,
                    minute: fromParts.find(p => p.type === 'minute').value,
                    second: fromParts.find(p => p.type === 'second').value
                };
                
                // Crear fecha UTC equivalente
                const utcDate = new Date(Date.UTC(
                    parseInt(fromTime.year),
                    parseInt(fromTime.month) - 1,
                    parseInt(fromTime.day),
                    parseInt(fromTime.hour),
                    parseInt(fromTime.minute),
                    parseInt(fromTime.second)
                ));
                
                // Ajustar por la diferencia de zona horaria
                const fromOffset = new Date().toLocaleString('en-US', { timeZone: fromZone, timeZoneName: 'longOffset' });
                const toOffset = new Date().toLocaleString('en-US', { timeZone: zone, timeZoneName: 'longOffset' });
                
                dateToFormat = utcDate;
            }
            
            const parts = formatter.formatToParts(dateToFormat);
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
            
            document.getElementById(`${id}-time`).textContent = timeString;
            document.getElementById(`${id}-date`).textContent = translateToSpanish(dateString);
        });
    }
    
    // Actualizar todas las zonas al cargar
    updateAllZones();
    
    // Actualizar cada segundo para que sea en vivo
    setInterval(() => {
        updateClocks();
        if (!document.getElementById('converter-date').value) {
            convertTimeZone();
            updateAllZones();
        } else {
            updateAllZones();
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
