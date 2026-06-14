// API Service: Mengambil data pesanan dari server
async function fetchOrder(orderId, token) {
    const response = await fetch(`https://example.com/api/order/${orderId}`, {
        headers: {
            'Authorization': token
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order details');
    }

    return response.json();
}

// UI Service: Merender konten detail pesanan ke modal
function renderOrderDetails(order, container) {
    container.innerHTML = '';

    const header = document.createElement('h3');
    header.textContent = `Order ID: ${order.id}`;
    container.appendChild(header);

    const status = document.createElement('p');
    status.textContent = `Status: ${order.status}`;
    container.appendChild(status);
}

// UI Service: Mengatur visibilitas modal
function setModalVisibility(modal, isVisible) {
    modal.style.display = isVisible ? 'block' : 'none';
}

// Controller / Coordinator: Mengatur aksi dan event listener pada modal
function setupModalActions(modal, order, token) {
    const closeBtn = modal.querySelector('.close');
    const confirmBtn = modal.querySelector('#confirmOrderBtn');

    // Event listener untuk tombol tutup modal (dieksekusi sekali)
    closeBtn.addEventListener('click', () => {
        setModalVisibility(modal, false);
    }, { once: true });

    // Penanganan tombol konfirmasi pesanan
    if (order.status === 'Delivered') {
        confirmBtn.style.display = 'none';
    } else {
        confirmBtn.style.display = 'block';

        // Duplikasi tombol konfirmasi untuk membersihkan event listener sebelumnya (mencegah memory leak)
        const cleanConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(cleanConfirmBtn, confirmBtn);

        cleanConfirmBtn.addEventListener('click', () => {
            confirmOrder(order.id, token);
        }, { once: true });
    }
}

// Main Orchestrator: Alur utama pengambilan dan penyerahan detail pesanan
async function fetchOrderDetails(orderId, token) {
    try {
        const order = await fetchOrder(orderId, token);
        const modal = document.getElementById('orderModal');
        const detailsDiv = modal.querySelector('#orderDetails');

        renderOrderDetails(order, detailsDiv);
        setModalVisibility(modal, true);
        setupModalActions(modal, order, token);
    } catch (error) {
        console.error('Error fetching/displaying order details:', error);
    }
}