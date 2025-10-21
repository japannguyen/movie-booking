// assets/js/data.js

const MOVIES = [
    { 
        id: 1, 
        title: "Lật Mặt: Vòng Xoáy Định Mệnh", 
        poster: "latmatvongxoaydinhmenh.jpg", 
        duration: "130 phút", 
        description: "Một câu chuyện kịch tính về một người đàn ông bị cuốn vào vòng xoáy của một vụ án bí ẩn, buộc anh ta phải đối đầu với quá khứ và tìm kiếm sự thật.",
        genre: "Hành động, Giật gân"
    },
    { 
        id: 2, 
        title: "Bố Già", 
        poster: "bogia.jpg", 
        duration: "115 phút", 
        description: "Phim khai thác sâu sắc về tình cha con và những mâu thuẫn thế hệ trong một gia đình lao động nghèo ở Sài Gòn, với diễn xuất cảm xúc.",
        genre: "Tâm lý, Gia đình"
    },
    { 
        id: 3, 
        title: "Mai", 
        poster: "mai.jpg", 
        duration: "131 phút", 
        description: "Bộ phim tâm lý tình cảm về người phụ nữ tên Mai, người đang cố gắng cân bằng giữa tình yêu và những gánh nặng cuộc sống.",
        genre: "Tình cảm, Chính kịch"
    }
    // Bạn có thể thêm nhiều phim khác
];

const SHOWTIMES = [
    // Suất chiếu cho Phim ID 1 (Lật Mặt)
    { id: 101, movieId: 1, date: "2025-10-25", time: "18:00", price: 90000, screen: "Screen 1" },
    { id: 102, movieId: 1, date: "2025-10-25", time: "20:30", price: 100000, screen: "Screen 2" },
    
    // Suất chiếu cho Phim ID 2 (Bố Già)
    { id: 201, movieId: 2, date: "2025-10-25", time: "17:30", price: 90000, screen: "Screen 3" },
    { id: 202, movieId: 2, date: "2025-10-26", time: "19:00", price: 110000, screen: "Screen 2" },
    
    // Suất chiếu cho Phim ID 3 (Mai)
    { id: 301, movieId: 3, date: "2025-10-26", time: "21:00", price: 120000, screen: "Screen 1" }
];

// Sơ đồ ghế cho các phòng chiếu (Mô phỏng)
const SCREEN_LAYOUT = {
    'Screen 1': { rows: 8, cols: 10, vip_rows: ['A', 'B'] }, // A và B là ghế VIP
    'Screen 2': { rows: 10, cols: 12, vip_rows: ['J', 'I'] },
    'Screen 3': { rows: 6, cols: 8, vip_rows: [] }
};

// Ghế đã bán giả định 
const BOOKED_SEATS_MOCK = {
    101: ['A1', 'A2', 'B3', 'D7', 'D8'], 
    201: ['E1', 'E2', 'F7'],
    301: ['A5', 'A6', 'C1']
};