const seatsContainer = document.getElementById('seats');
const selectedSeats = document.getElementById('selected-seats');
const totalDisplay = document.getElementById('total');
const payButton = document.getElementById('pay-button');

const movieTitle = document.getElementById('movie-title');
const cinemaName = document.getElementById('cinema-name');
const showTime = document.getElementById('show-time');
const ticketPriceDisplay = document.getElementById('ticket-price');

// Lấy thông tin suất chiếu từ localStorage
const showtime = JSON.parse(localStorage.getItem('selectedShowtime'));

if (showtime) {
  movieTitle.textContent = showtime.movie;
  cinemaName.textContent = showtime.cinema;
  showTime.textContent = showtime.time;
  ticketPriceDisplay.textContent = parseInt(showtime.price).toLocaleString('vi-VN');
} else {
  alert("Không có dữ liệu suất chiếu, quay lại trang trước!");
  window.location.href = "movie-details.html";
}

const ticketPrice = parseInt(showtime.price);
let selected = [];

// Tạo 40 ghế (với vài ghế đã bán)
const totalSeats = 40;
const occupiedSeats = [3, 8, 14, 22, 35];

for (let i = 0; i < totalSeats; i++) {
  const seat = document.createElement('div');
  seat.classList.add('seat');
  if (occupiedSeats.includes(i)) seat.classList.add('occupied');
  seat.dataset.index = i;
  seatsContainer.appendChild(seat);
}

// Xử lý click chọn ghế
seatsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelected();
  }
});

function updateSelected() {
  const selectedSeatsElements = document.querySelectorAll('.seat.selected');
  selected = [...selectedSeatsElements].map(seat => seat.dataset.index);
  selectedSeats.textContent = selected.length;
  totalDisplay.textContent = (selected.length * ticketPrice).toLocaleString('vi-VN');
}

// Xử lý khi nhấn Thanh Toán
payButton.addEventListener('click', () => {
  if (selected.length === 0) {
    alert('Vui lòng chọn ít nhất 1 ghế!');
    return;
  }

  const total = selected.length * ticketPrice;
  alert(`🎟️ Bạn đã chọn ${selected.length} ghế.\n💰 Tổng tiền: ${total.toLocaleString('vi-VN')} VND`);
});
