// assets/js/booking.js

document.addEventListener('DOMContentLoaded', () => {
    const seatMapContainer = document.getElementById('seat-map-container');
    const selectedSeatsDisplay = document.getElementById('selected-seats-display');
    const totalPriceElement = document.getElementById('total-price');
    const seatCountElement = document.getElementById('seat-count');
    const confirmBtn = document.getElementById('confirm-booking-btn');
    
    // --- DỮ LIỆU CỐ ĐỊNH ---
    const TICKET_PRICE = 100000;
    const VIP_PRICE = 150000;
    
    // Giả lập thông tin suất chiếu (Sẽ lấy từ URL nếu có logic phức tạp hơn)
    const MOVIE_DATA = {
        title: "Lật Mặt: Vòng Xoáy Định Mệnh",
        date: "20/10/2025",
        time: "19:00",
        screen: "Rạp 03",
    };

    // Định nghĩa sơ đồ ghế
    const SEAT_PLAN = [
        { row: 'A', count: 8, booked: ['A1', 'A2'], vip: [] },
        { row: 'B', count: 8, booked: ['B8'], vip: ['B3', 'B4'] },
        { row: 'C', count: 8, booked: [], vip: ['C3', 'C4', 'C5', 'C6'] },
        { row: 'D', count: 8, booked: ['D1', 'D2', 'D3'], vip: ['D4', 'D5'] },
        { row: 'E', count: 8, booked: [], vip: [] },
        { row: 'F', count: 8, booked: ['F4'], vip: [] },
    ];

    let selectedSeats = [];

    // --- 1. Cập nhật thông tin tóm tắt ban đầu ---
    document.getElementById('summary-movie-title').textContent = MOVIE_DATA.title;
    document.getElementById('summary-showtime-time').textContent = `${MOVIE_DATA.date} - ${MOVIE_DATA.time}`;
    document.getElementById('summary-screen-name').textContent = MOVIE_DATA.screen;

    // --- 2. Hàm tính tổng tiền (phân biệt ghế VIP và ghế Thường) ---
    function calculateTotal() {
        let total = 0;
        selectedSeats.forEach(seatId => {
            const row = seatId.charAt(0);
            const plan = SEAT_PLAN.find(p => p.row === row);
            
            if (plan && plan.vip.includes(seatId)) {
                total += VIP_PRICE;
            } else {
                total += TICKET_PRICE;
            }
        });
        // Định dạng tiền tệ
        totalPriceElement.textContent = total.toLocaleString('vi-VN'); 
    }

    // --- 3. Hàm cập nhật giao diện tóm tắt ---
    function updateSummary() {
        seatCountElement.textContent = selectedSeats.length;
        selectedSeats.sort(); // Sắp xếp ghế A1, A2, B1,...

        if (selectedSeats.length === 0) {
            selectedSeatsDisplay.innerHTML = "Chưa chọn ghế nào.";
            selectedSeatsDisplay.className = 'alert py-2 alert-warning';
            confirmBtn.disabled = true;
        } else {
            selectedSeatsDisplay.innerHTML = `<span class="fw-bold text-info">${selectedSeats.join(', ')}</span>`;
            selectedSeatsDisplay.className = 'alert py-2 alert-info';
            confirmBtn.disabled = false;
        }
        calculateTotal();
    }

    // --- 4. Hàm xử lý click ghế ---
    function handleSeatClick(event) {
        const seat = event.target;
        
        // Bỏ qua nếu ghế đã bán
        if (seat.classList.contains('booked')) {
            alert("Ghế này đã có người mua!");
            return;
        }

        const seatId = seat.dataset.seatId;

        if (seat.classList.contains('selected')) {
            // Hủy chọn ghế
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(id => id !== seatId);
        } else {
            // Chọn ghế
            seat.classList.add('selected');
            selectedSeats.push(seatId);
        }

        updateSummary();
    }

    // --- 5. Hàm Vẽ Sơ Đồ Ghế (Hàng ngang) ---
    function renderSeatMap() {
        seatMapContainer.innerHTML = '';
        
        SEAT_PLAN.forEach(plan => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row-of-seats');
            
            // 5a. Nhãn hàng ghế (A, B, C...)
            const rowLabel = document.createElement('div');
            rowLabel.classList.add('row-label');
            rowLabel.textContent = plan.row; 
            rowDiv.appendChild(rowLabel);

            // 5b. Tạo từng ghế trong hàng
            for (let i = 1; i <= plan.count; i++) {
                const seatId = `${plan.row}${i}`;
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.dataset.seatId = seatId;
                seat.textContent = i; // Hiển thị số ghế

                if (plan.booked.includes(seatId)) {
                    seat.classList.add('booked');
                } else if (plan.vip.includes(seatId)) {
                    seat.classList.add('available', 'vip');
                    seat.addEventListener('click', handleSeatClick);
                } else {
                    seat.classList.add('available');
                    seat.addEventListener('click', handleSeatClick);
                }
                rowDiv.appendChild(seat);
            }
            // Thêm một khoảng trống nhỏ giữa các hàng (nếu cần)
            // if (plan.row === 'C') { rowDiv.style.marginBottom = '20px'; }

            seatMapContainer.appendChild(rowDiv);
        });
    }

    // --- 6. Xử lý nút Thanh toán ---
    confirmBtn.addEventListener('click', () => {
        if (selectedSeats.length === 0) return;

        // Lưu dữ liệu vào localStorage để chuyển sang trang thanh toán
        const bookingInfo = {
            movieTitle: MOVIE_DATA.title,
            date: MOVIE_DATA.date,
            time: MOVIE_DATA.time,
            seats: selectedSeats.sort(),
            total: parseFloat(totalPriceElement.textContent.replace(/\./g, '').replace(/,/g, '')), // Loại bỏ định dạng tiền tệ
        };
        
        localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));
        window.location.href = 'summary-payment.html';
    });

    // --- KHỞI TẠO ---
    renderSeatMap();
    updateSummary(); 
});