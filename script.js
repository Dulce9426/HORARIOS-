// Estado global
let use24Hour = true;
let converterBaseTime = new Date();

// Traducir días y meses al español
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Obtener tiempo en una zona horaria específica
function getTimeInZone(date, timezone) {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
}

// Formatear hora
function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    if (!use24Hour) {
        const ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
        return String(hours).padStart(2, '0') + ':' + 
               String(minutes).padStart(2, '0') + ':' + 
               String(seconds).padStart(2, '0') + ampm;
    }
    
    return String(hours).padStart(2, '0') + ':' + 
           String(minutes).padStart(2, '0') + ':' + 
           String(seconds).padStart(2, '0');
}

// Formatear fecha corta
function formatDateShort(date) {
    const dia = dias[date.getDay()];
    const num = date.getDate();
    const mes = meses[date.getMonth()];
    return `${dia}, ${num} ${mes}`;
}

// ========== RELOJES EN VIVO ==========
function updateLiveClocks() {
    const now = new Date();
    
    document.querySelectorAll('.live-clock').forEach(clock => {
        const timezone = clock.dataset.timezone;
        const timeInZone = getTimeInZone(now, timezone);
        clock.querySelector('.live-time').textContent = formatTime(timeInZone);
    });
}

// ========== CONVERSOR ==========
function updateConverterClock(card, date) {
    const timezone = card.dataset.timezone;
    const timeInZone = getTimeInZone(date, timezone);
    
    const hours = timeInZone.getHours();
    const minutes = timeInZone.getMinutes();
    
    card.querySelector('.hours').textContent = String(hours).padStart(2, '0');
    card.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
    card.querySelector('.date-display').textContent = formatDateShort(timeInZone);
    
    // Actualizar sliders
    card.querySelector('.hour-slider').value = hours;
    card.querySelector('.minute-slider').value = minutes;
}

function updateAllConverterClocks() {
    document.querySelectorAll('.clock-card').forEach(card => {
        updateConverterClock(card, converterBaseTime);
    });
}

function syncConverterClocks(changedCard) {
    const timezone = changedCard.dataset.timezone;
    const hours = parseInt(changedCard.querySelector('.hour-slider').value);
    const minutes = parseInt(changedCard.querySelector('.minute-slider').value);
    
    // Obtener el tiempo actual en esa zona
    const currentInZone = getTimeInZone(converterBaseTime, timezone);
    
    // Crear nueva fecha con las horas/minutos cambiados
    const newTime = new Date(currentInZone);
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    
    // Calcular la diferencia y aplicarla al tiempo base
    const diff = newTime - currentInZone;
    converterBaseTime = new Date(converterBaseTime.getTime() + diff);
    
    // Actualizar todos los relojes del conversor
    document.querySelectorAll('.clock-card').forEach(card => {
        updateConverterClock(card, converterBaseTime);
    });
}

function resetConverterToNow() {
    converterBaseTime = new Date();
    updateAllConverterClocks();
    
    // Quitar clase active de todas las tarjetas
    document.querySelectorAll('.clock-card').forEach(card => {
        card.classList.remove('active');
    });
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    // Botón formato 12H/24H
    const btnFormat = document.getElementById('btn-format-live');
    btnFormat.addEventListener('click', () => {
        use24Hour = !use24Hour;
        btnFormat.textContent = use24Hour ? '24H' : '12H';
        updateLiveClocks();
    });
    
    // Botón reset conversor
    document.getElementById('btn-reset').addEventListener('click', resetConverterToNow);
    
    // Eventos para los sliders del conversor
    document.querySelectorAll('.clock-card').forEach(card => {
        const hourSlider = card.querySelector('.hour-slider');
        const minuteSlider = card.querySelector('.minute-slider');
        
        const handleSliderChange = () => {
            // Activar esta tarjeta
            document.querySelectorAll('.clock-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            syncConverterClocks(card);
        };
        
        hourSlider.addEventListener('input', handleSliderChange);
        minuteSlider.addEventListener('input', handleSliderChange);
    });
    
    // Inicializar relojes
    updateLiveClocks();
    resetConverterToNow();
    
    // Actualizar relojes en vivo cada segundo
    setInterval(updateLiveClocks, 1000);
});

// ========== PWA - SERVICE WORKER ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');
            console.log('✅ PWA: Service Worker registrado', registration.scope);
            
            // Verificar actualizaciones
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('🔄 PWA: Nueva versión disponible');
                    }
                });
            });
        } catch (error) {
            console.log('❌ PWA: Error registrando SW:', error);
        }
    });
}

// Detectar si está instalada como PWA
window.addEventListener('appinstalled', () => {
    console.log('📱 PWA: App instalada correctamente');
});
