import { guiYeuCauApi, thoatMaHtml } from '../api.js';

export const trangCongDong = {
  ve() {
    return `
      <section class="page-heading reveal"><div><p class="eyebrow">LẮNG NGHE VÀ ĐỒNG CẢM</p><h1>Cộng đồng MindCare</h1><p class="muted">Một nơi để chia sẻ, không phán xét. Bài viết mới sẽ được kiểm duyệt trước khi xuất hiện.</p></div><span class="date-stamp">AN TOÀN<br><strong>♡</strong></span></section>
      <div class="community-layout">
        <section class="panel compose-panel reveal">
          <p class="eyebrow">BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN</p><h2>Điều gì đang ở trong tâm trí bạn?</h2>
          <form id="post-form" class="stack-form">
            <label for="post-topic">Chủ đề</label><select id="post-topic" name="topic"><option value="lo-au">Lo âu</option><option value="tam-trang">Tâm trạng</option><option value="mat-ngu">Mất ngủ</option><option value="hoc-duong">Học đường</option><option value="khac">Khác</option></select>
            <label for="post-content">Nội dung</label><textarea id="post-content" name="content" rows="5" minlength="3" maxlength="3000" placeholder="Chia sẻ theo cách bạn thấy thoải mái…" required></textarea>
            <label for="post-identity">Cách hiển thị danh tính</label><select id="post-identity" name="anonymityMode"><option value="unlinked">Ẩn danh, không gắn UID vào bài viết</option><option value="moderator_only">Ẩn danh với cộng đồng, admin có thể tra cứu</option><option value="public">Hiện tên hiển thị</option></select>
            <button class="button button-dark" type="submit">Gửi để kiểm duyệt <span aria-hidden="true">→</span></button><p class="form-message" id="post-message" role="status"></p>
          </form>
        </section>
        <section class="community-feed reveal"><div class="feed-heading"><div><p class="eyebrow">BẢNG TIN</p><h2>Chia sẻ gần đây</h2></div><span class="live-dot">ĐANG LẮNG NGHE</span></div><div id="post-list" class="post-list"><p class="muted">Đang tải bài viết…</p></div></section>
      </div>`;
  },
  gan(dauRa) {
    const danhSach = dauRa.querySelector('#post-list');
    const thongBao = dauRa.querySelector('#post-message');
    const taiBaiViet = async () => {
      try {
        const { posts: cacBaiViet } = await guiYeuCauApi('/posts');
        danhSach.innerHTML = cacBaiViet.length ? cacBaiViet.map((baiViet) => `
          <article class="post-item"><div class="post-meta"><span class="post-author">${thoatMaHtml(baiViet.author_name || 'Ẩn danh')}</span><span class="topic-tag">#${thoatMaHtml(baiViet.topic)}</span></div><p>${thoatMaHtml(baiViet.content)}</p><small>${new Date(baiViet.created_at).toLocaleDateString('vi-VN')}</small></article>`).join('') : '<p class="muted">Chưa có bài viết được duyệt. Bạn có thể là người mở đầu.</p>';
      } catch (loi) {
        danhSach.innerHTML = `<p class="muted">${thoatMaHtml(loi.message)}<br>Thêm thông tin Supabase vào .env để tải bài viết.</p>`;
      }
    };
    taiBaiViet();
    const bieuMau = dauRa.querySelector('#post-form');
    bieuMau.addEventListener('submit', async (suKien) => {
      suKien.preventDefault();
      const duLieuBieuMau = new FormData(bieuMau);
      const nutGui = bieuMau.querySelector('[type="submit"]');
      nutGui.disabled = true;
      thongBao.textContent = 'Đang gửi bài viết…';
      try {
        await guiYeuCauApi('/posts', {
          method: 'POST',
          body: JSON.stringify({ content: duLieuBieuMau.get('content'), topic: duLieuBieuMau.get('topic'), anonymityMode: duLieuBieuMau.get('anonymityMode') })
        });
        bieuMau.reset();
        bieuMau.querySelector('[name="anonymityMode"]').value = 'unlinked';
        thongBao.textContent = 'Bài viết đã gửi và đang chờ kiểm duyệt.';
      } catch (loi) {
        thongBao.textContent = loi.message === 'Sign in is required.' ? 'Đăng nhập để gửi bài viết.' : loi.message;
      } finally {
        nutGui.disabled = false;
      }
    });
  }
};
