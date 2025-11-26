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

function getTimeInTimeZone(timeZone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
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
    
    return {
        time: `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`,
        date: translateToSpanish(dateString)
    };
}

function updateClocks() {
    // GMT
    const gmt = getTimeInTimeZone('Europe/London');
    document.getElementById('gmt-time').textContent = gmt.time;
    document.getElementById('gmt-date').textContent = gmt.date;

    // México
    const mexico = getTimeInTimeZone('America/Mexico_City');
    document.getElementById('mexico-time').textContent = mexico.time;
    document.getElementById('mexico-date').textContent = mexico.date;

    // Nueva York
    const ny = getTimeInTimeZone('America/New_York');
    document.getElementById('ny-time').textContent = ny.time;
    document.getElementById('ny-date').textContent = ny.date;
}

// Actualizar inmediatamente al cargar la página
updateClocks();

// Actualizar cada segundo para que sea en vivo
setInterval(updateClocks, 1000);
