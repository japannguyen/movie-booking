// assets/js/app.js - Logic Trang Chủ & Carousel

document.addEventListener('DOMContentLoaded', () => {
    const movieListContainer = document.getElementById('movie-list');
    const carouselInner = document.getElementById('carousel-inner');
    
    // Kiểm tra xem dữ liệu phim (từ data.js) có tồn tại không
    if (typeof MOVIES === 'undefined' || MOVIES.length === 0) {
        movieListContainer.innerHTML = `<div class="col-12"><div class="alert alert-warning text-center" role="alert">⚠️ Không tìm thấy phim nào đang chiếu.</div></div>`;
        return;
    }

    // --- 1. Tạo Carousel (Phim Nổi bật: Lấy 2 phim đầu tiên) ---
    const featuredMovies = MOVIES.slice(0, 2);
    carouselInner.innerHTML = ''; // Xóa nội dung cũ (nếu có)
    
    featuredMovies.forEach((movie, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active'); // Đặt phim đầu tiên là active
        }

        carouselItem.innerHTML = `
            <img src="assets/images/${movie.poster}" class="d-block w-100" alt="${movie.title}">
            <div class="carousel-caption d-none d-md-block">
                
                <h3 class="animate__animated animate__fadeInDown animate__slow">
                    ${movie.title.toUpperCase()}
                </h3>
                
                <p class="animate__animated animate__fadeInUp animate__delay-1s">
                    ${movie.description.substring(0, 120)}...
                </p>
                
                <a href="movie-details.html?id=${movie.id}" class="btn btn-danger btn-lg mt-2 animate__animated animate__zoomIn animate__delay-2s">
                    ĐẶT VÉ NGAY
                </a>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });

    // --- 2. Tạo Danh sách Phim Chính (Phim Đang Chiếu) ---
    movieListContainer.innerHTML = ''; // Xóa nội dung cũ (nếu có)

    MOVIES.forEach((movie, index) => {
        const col = document.createElement('div');
        col.classList.add('col');
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('card', 'shadow-lg', 'h-100', 'border-0', 'movie-card'); 

        // Thêm animation khi load danh sách phim
        movieCard.classList.add('animate__animated', 'animate__fadeInUp');
        movieCard.style.cursor = 'pointer'; 
        movieCard.style.animationDelay = `${0.1 * index}s`; 

        movieCard.innerHTML = `
            <img src="assets/images/${movie.poster}" class="card-img-top" alt="${movie.title}" loading="lazy">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-danger mb-1">${movie.title}</h5>
                <p class="card-text mb-1 flex-grow-1"><small class="text-muted">Thể loại: ${movie.genre}</small></p>
                <p class="card-text mb-3"><small class="text-muted">Thời lượng: ${movie.duration}</small></p>
                <button class="btn btn-lg btn-danger w-100 mt-auto">
                    Xem Chi Tiết & Đặt Vé
                </button>
            </div>
        `;
        
        // Sự kiện click chuyển sang trang chi tiết
        movieCard.addEventListener('click', () => {
            window.location.href = `movie-details.html?id=${movie.id}`;
        });

        col.appendChild(movieCard);
        movieListContainer.appendChild(col);
    });
});