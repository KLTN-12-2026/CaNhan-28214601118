export const trangThuVien = {
  ve() {
    return `
      <section class="page-heading reveal"><div><p class="eyebrow">GÓC BÌNH YÊN</p><h1>Một chút dịu dàng cho hôm nay.</h1><p class="muted">Những thực hành nhỏ để bạn thư giãn và tìm hiểu về sức khỏe tinh thần.</p></div><span class="date-stamp">THƯ VIỆN<br><strong>01</strong></span></section>
      <section class="library-grid"><article class="panel practice-panel reveal"><div class="practice-art breath-art"><span class="breath-ring" id="breath-ring"></span><span class="breath-label" id="breath-label">Sẵn sàng?</span></div><div class="practice-copy"><p class="eyebrow">THỰC HÀNH · 2 PHÚT</p><h2>Thở chậm, trở về hiện tại</h2><p class="muted">Hít vào nhẹ nhàng trong 4 nhịp, thở ra trong 6 nhịp. Dừng lại nếu bạn cảm thấy không thoải mái.</p><button class="button button-dark" id="breath-button" type="button">Bắt đầu bài thở</button></div></article><article class="panel knowledge-panel reveal"><p class="eyebrow">TÌM HIỂU</p><h2>Sức khỏe tinh thần cũng cần được chăm sóc.</h2><p class="muted">Cảm xúc có thể thay đổi theo thời gian. Ghi nhận điều mình trải qua là một khởi đầu hữu ích, nhưng kết quả tự đánh giá không thay thế chẩn đoán của chuyên gia.</p><a class="text-link" href="https://www.who.int/health-topics/mental-health" target="_blank" rel="noreferrer">Đọc thông tin từ WHO <span aria-hidden="true">↗</span></a></article><article class="panel audio-panel reveal"><span class="audio-icon" aria-hidden="true">♫</span><div><p class="eyebrow">THƯ VIỆN ÂM THANH</p><h2>Âm thanh thư giãn</h2><p class="muted">Thêm tệp nhạc thiền, tiếng mưa hoặc sóng biển vào thư mục <code>public/audio</code> để mở rộng thư viện.</p></div><p class="form-message">Chưa có tệp âm thanh. Hãy chỉ sử dụng nội dung bạn có quyền phân phối.</p></article></section>`;
  },
  gan(dauRa) {
    const nutDieuKhien = dauRa.querySelector('#breath-button');
    const nhanTrangThai = dauRa.querySelector('#breath-label');
    const vongTho = dauRa.querySelector('#breath-ring');
    let boHenGio;
    let giaiDoan = 0;
    const cacGiaiDoan = [{ noiDung: 'Hít vào', thoiLuong: 4000 }, { noiDung: 'Thở ra', thoiLuong: 6000 }];
    const chuyenGiaiDoan = () => {
      const giaiDoanHienTai = cacGiaiDoan[giaiDoan % cacGiaiDoan.length];
      nhanTrangThai.textContent = giaiDoanHienTai.noiDung;
      vongTho.classList.toggle('is-inhaling', giaiDoan % cacGiaiDoan.length === 0);
      giaiDoan += 1;
      boHenGio = window.setTimeout(chuyenGiaiDoan, giaiDoanHienTai.thoiLuong);
    };
    nutDieuKhien.addEventListener('click', () => {
      if (boHenGio) {
        window.clearTimeout(boHenGio);
        boHenGio = undefined;
        nhanTrangThai.textContent = 'Đã tạm dừng';
        vongTho.classList.remove('is-inhaling');
        nutDieuKhien.textContent = 'Tiếp tục bài thở';
      } else {
        nutDieuKhien.textContent = 'Tạm dừng';
        chuyenGiaiDoan();
      }
    });
    return () => window.clearTimeout(boHenGio);
  }
};
