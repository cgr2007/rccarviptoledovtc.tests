/**
 * RC VIP CARS TOLEDO S.L - Servicio Exclusivo de Chófer Privado & VTC
 * Vehículo Oficial: BYD Seal (Azul Celeste / Interior Gris Claro Premium)
 */

// 1. DATOS DEL VEHÍCULO OFICIAL
const OFFICIAL_VEHICLE = {
    name: 'BYD Seal Excellence',
    colorExterior: 'Azul Celeste Metalizado',
    colorInterior: 'Cuero Gris Claro Premium',
    category: 'Berlina Deportiva 100% Eléctrica',
    passengers: 4,
    luggage: 3,
    emissions: '0 Emisiones (Etiqueta CERO DGT)'
};

const COMPANY_PHONE = '629368818';
const COMPANY_PHONE_DISPLAY = '629 368 818';

// Galería interactiva del BYD Seal (Exterior vs Interior)
const CAR_PHOTOS = {
    exterior: {
        src: 'byd-seal-azul-celeste.jpg',
        title: 'BYD Seal • Azul Celeste Metalizado',
        subtitle: 'Vehículo Oficial • Berlina Ejecutiva 100% Eléctrica',
        alt: 'BYD Seal Azul Celeste Metalizado'
    },
    interior: {
        src: 'byd-seal-interior-gris.jpg',
        title: 'Interior • Cuero Gris Claro Premium',
        subtitle: 'Habitáculo de Confort, Pantalla Táctil y Techo Panorámico',
        alt: 'Interior BYD Seal Cuero Gris Claro Premium'
    }
};

function switchCarPhoto(view) {
    const img = document.getElementById('mainCarImg');
    const title = document.getElementById('carViewTitle');
    const subtitle = document.getElementById('carViewSubtitle');
    const btnExt = document.getElementById('btnViewExterior');
    const btnInt = document.getElementById('btnViewInterior');
    
    if (!img) return;
    
    img.style.opacity = '0.3';
    setTimeout(() => {
        const inactiveClass = 'px-4 py-2 rounded-full text-xs font-semibold bg-dark-950/70 backdrop-blur-md text-slate-300 hover:text-white border border-white/20 hover:border-white/40 shadow-lg flex items-center gap-2 transition-all';
        const activeBlueClass = 'px-4 py-2 rounded-full text-xs font-bold bg-dark-950/90 backdrop-blur-md text-seal-blue border border-seal-blue shadow-lg flex items-center gap-2 transition-all';
        const activeGoldClass = 'px-4 py-2 rounded-full text-xs font-bold bg-dark-950/90 backdrop-blur-md text-gold-400 border border-gold-400 shadow-lg flex items-center gap-2 transition-all';
        
        if (view === 'interior') {
            img.src = CAR_PHOTOS.interior.src;
            img.alt = CAR_PHOTOS.interior.alt;
            if (title) title.textContent = CAR_PHOTOS.interior.title;
            if (subtitle) subtitle.textContent = CAR_PHOTOS.interior.subtitle;
            if (btnInt) btnInt.className = activeGoldClass;
            if (btnExt) btnExt.className = inactiveClass;
        } else {
            img.src = CAR_PHOTOS.exterior.src;
            img.alt = CAR_PHOTOS.exterior.alt;
            if (title) title.textContent = CAR_PHOTOS.exterior.title;
            if (subtitle) subtitle.textContent = CAR_PHOTOS.exterior.subtitle;
            if (btnExt) btnExt.className = activeBlueClass;
            if (btnInt) btnInt.className = inactiveClass;
        }
        img.style.opacity = '1';
    }, 150);
}

// 2. ESTADO GLOBAL DE LA APLICACIÓN
let currentSearch = {
    mode: 'p2p', // 'p2p' o 'hourly'
    pickup: '',
    dropoff: '',
    hours: 3,
    date: '',
    time: '',
    passengers: 3,
    luggage: 2
};

// 3. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    initDefaultDates();
    setupMobileMenu();
});

// Configurar fecha y hora por defecto (mañana a las 10:00)
function initDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeInput = document.getElementById('pickupTime');
    
    if (pickupDateInput) {
        pickupDateInput.value = `${yyyy}-${mm}-${dd}`;
        pickupDateInput.min = `${yyyy}-${mm}-${dd}`;
        currentSearch.date = `${yyyy}-${mm}-${dd}`;
    }
    
    if (pickupTimeInput) {
        pickupTimeInput.value = '10:00';
        currentSearch.time = '10:00';
    }
}

// 4. CAMBIO DE TABS (PUNTO A PUNTO vs POR HORAS)
function switchBookingTab(tab) {
    currentSearch.mode = tab;
    
    const tabP2P = document.getElementById('tabPointToPoint');
    const tabHourly = document.getElementById('tabByHour');
    const destWrapper = document.getElementById('destinationWrapper');
    const hourlyWrapper = document.getElementById('hourlyWrapper');
    const dropoffInput = document.getElementById('dropoffLocation');
    
    if (tab === 'p2p') {
        tabP2P.className = 'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-gold-500 to-amber-600 text-dark-950 shadow-md';
        tabHourly.className = 'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 text-slate-400 hover:text-white';
        destWrapper.classList.remove('hidden');
        hourlyWrapper.classList.add('hidden');
        dropoffInput.required = true;
    } else {
        tabHourly.className = 'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-gold-500 to-amber-600 text-dark-950 shadow-md';
        tabP2P.className = 'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 text-slate-400 hover:text-white';
        destWrapper.classList.add('hidden');
        hourlyWrapper.classList.remove('hidden');
        dropoffInput.required = false;
    }
}

// 5. MANEJO DEL SUBMIT DEL FORMULARIO PRINCIPAL (CONSULTA DIRECTA POR WHATSAPP)
function handleSearchVehicles(event) {
    event.preventDefault();
    
    currentSearch.pickup = document.getElementById('pickupLocation').value.trim() || 'Lugar indicado';
    currentSearch.date = document.getElementById('pickupDate').value;
    currentSearch.time = document.getElementById('pickupTime').value;
    currentSearch.passengers = parseInt(document.getElementById('passengerCount').value);
    currentSearch.luggage = parseInt(document.getElementById('luggageCount').value);
    
    let routeDesc = '';
    if (currentSearch.mode === 'p2p') {
        currentSearch.dropoff = document.getElementById('dropoffLocation').value.trim() || 'Destino indicado';
        routeDesc = `• Tipo de servicio: Trayecto punto a punto\n• Recogida: ${currentSearch.pickup}\n• Destino: ${currentSearch.dropoff}`;
    } else {
        currentSearch.hours = parseInt(document.getElementById('durationHours').value);
        routeDesc = `• Tipo de servicio: Disposición por horas\n• Duración: ${currentSearch.hours} horas\n• Recogida: ${currentSearch.pickup}`;
    }
    
    const dateFormatted = currentSearch.date ? currentSearch.date.split('-').reverse().join('/') : 'A convenir';
    
    const message = [
        'Hola RC VIP CARS VTC TOLEDO S.L, quiero consultar la tarifa para un servicio con el BYD Seal.',
        '',
        routeDesc,
        `• Fecha prevista: ${dateFormatted}`,
        `• Hora de salida: ${currentSearch.time || '10:00'}h`,
        `• Pasajeros: ${currentSearch.passengers}`,
        `• Maletas: ${currentSearch.luggage}`,
        '',
        '¿Cuál sería el presupuesto y la disponibilidad? Gracias.'
    ].join('\n');

    const waUrl = `https://wa.me/34${COMPANY_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    // Guardar en el panel interno de gestión
    saveBookingToStorage({
        code: '#RC-' + Math.floor(10000 + Math.random() * 90000),
        clientName: 'Consulta WhatsApp',
        clientPhone: 'WhatsApp 629 368 818',
        carName: 'BYD Seal (Azul Celeste)',
        route: currentSearch.mode === 'p2p' ? `${currentSearch.pickup} → ${currentSearch.dropoff}` : `Disposición (${currentSearch.hours}h) en ${currentSearch.pickup}`,
        date: dateFormatted,
        time: currentSearch.time,
        totalPrice: 'A consultar por WhatsApp',
        status: 'Consulta enviada',
        createdAt: new Date().toISOString()
    });
    showToast('Abriendo WhatsApp con los datos de tu viaje...');
    showToast('Abriendo WhatsApp con los datos de tu viaje...');
}

// 6. MODAL DE SOLICITUD / CHECKOUT
function openCheckoutModal() {
    // Set Summary
    const pickupVal = document.getElementById('pickupLocation').value.trim() || currentSearch.pickup || 'Recogida indicada';
    const dropoffVal = document.getElementById('dropoffLocation').value.trim() || currentSearch.dropoff || 'Destino indicado';
    
    if (currentSearch.mode === 'p2p') {
        document.getElementById('summaryRoute').textContent = `${pickupVal} → ${dropoffVal}`;
    } else {
        document.getElementById('summaryRoute').textContent = `Disposición por ${currentSearch.hours || 3}h con recogida en ${pickupVal}`;
    }
    
    const dateInput = document.getElementById('pickupDate').value || currentSearch.date;
    const timeInput = document.getElementById('pickupTime').value || currentSearch.time || '10:00';
    const dateFormatted = dateInput ? dateInput.split('-').reverse().join('/') : 'A convenir';
    document.getElementById('summaryDateTime').textContent = `${dateFormatted} a las ${timeInput}h`;
    
    const modal = document.getElementById('bookingCheckoutModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCheckoutModal() {
    const modal = document.getElementById('bookingCheckoutModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Enviar consulta directa por WhatsApp con datos del formulario
function sendDirectWhatsApp() {
    const name = document.getElementById('custName').value.trim() || 'Cliente';
    const phone = document.getElementById('custPhone').value.trim() || '';
    const route = document.getElementById('summaryRoute').textContent;
    const datetime = document.getElementById('summaryDateTime').textContent;
    const notes = document.getElementById('custFlight').value.trim();
    
    let text = `Hola RC VIP CARS TOLEDO S.L, solicito presupuesto para el BYD Seal (Azul Celeste / Gris Claro):\n` +
               `• Itinerario: ${route}\n` +
               `• Fecha/Hora: ${datetime}\n` +
               `• Pasajeros: ${currentSearch.passengers || 3}\n` +
               `• Nombre: ${name}\n` +
               `• Teléfono: ${phone}`;
               
    if (notes) {
        text += `\n• Observaciones: ${notes}`;
    }
    
    const url = `https://wa.me/34629368818?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// 7. SUBMIT DE LA SOLICITUD
function submitFinalBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const flight = document.getElementById('custFlight').value.trim();
    
    const randomCode = '#RC-' + Math.floor(10000 + Math.random() * 90000);
    const pickupVal = document.getElementById('pickupLocation').value.trim() || currentSearch.pickup || 'Recogida indicada';
    const dropoffVal = document.getElementById('dropoffLocation').value.trim() || currentSearch.dropoff || 'Destino indicado';
    
    const booking = {
        code: randomCode,
        clientName: name,
        clientPhone: phone,
        clientEmail: email,
        notes: flight,
        carName: 'BYD Seal (Azul Celeste / Interior Gris Claro)',
        route: currentSearch.mode === 'p2p' ? `${pickupVal} → ${dropoffVal}` : `Disposición (${currentSearch.hours}h) en ${pickupVal}`,
        pickup: pickupVal,
        date: document.getElementById('pickupDate').value || currentSearch.date,
        time: document.getElementById('pickupTime').value || currentSearch.time,
        totalPrice: 'A consultar',
        status: 'Pendiente cotización',
        createdAt: new Date().toISOString()
    };
    
    // Guardar en LocalStorage
    saveBookingToStorage(booking);
    
    // Cerrar modal de solicitud
    closeCheckoutModal();
    
    // Mostrar Modal de Éxito y configurar botón de WhatsApp
    showSuccessModal(booking);
    showToast('¡Solicitud registrada con éxito!');
}

function saveBookingToStorage(booking) {
    let list = [];
    try {
        const stored = localStorage.getItem('rc_cars_bookings');
        if (stored) list = JSON.parse(stored);
    } catch(e) {
        list = [];
    }
    list.unshift(booking);
    localStorage.setItem('rc_cars_bookings', JSON.stringify(list));
}

function showSuccessModal(booking) {
    document.getElementById('voucherCode').textContent = booking.code;
    document.getElementById('voucherVehicle').textContent = booking.carName;
    document.getElementById('voucherDate').textContent = `${booking.date} a las ${booking.time}h`;
    document.getElementById('voucherPickup').textContent = booking.pickup;
    
    // Configurar botón WhatsApp
    const waBtn = document.getElementById('whatsappSuccessBtn');
    if (waBtn) {
        waBtn.onclick = function() {
            const msg = `Hola RC VIP CARS TOLEDO S.L, he solicitado presupuesto con referencia ${booking.code} para el BYD Seal:\n` +
                        `• Trayecto: ${booking.route}\n` +
                        `• Fecha: ${booking.date} a las ${booking.time}h\n` +
                        `• Cliente: ${booking.clientName}\n` +
                        `• Tel: ${booking.clientPhone}`;
            window.open(`https://wa.me/34629368818?text=${encodeURIComponent(msg)}`, '_blank');
        };
    }
    
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// 8. FAQ ACCORDION
function toggleFaq(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// 10. MOBILE MENU
function setupMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

// 11. TOAST NOTIFICATIONS
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-message bg-dark-900 border border-gold-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs pointer-events-auto backdrop-blur-xl';
    toast.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-check text-[11px]"></i>
        </div>
        <span class="font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
