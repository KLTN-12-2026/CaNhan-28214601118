import { guiYeuCauApi } from '../api.js';

export const trangTaiKhoan = {
  ve() {
    return `
      <section class="page-heading reveal"><div><p class="eyebrow">TÀI KHOẢN MINDCARE</p><h1>Bắt đầu từ sự riêng tư.</h1><p class="muted">Tài khoản giúp lưu check-in của bạn và gửi bài viết đến cộng đồng.</p></div></section>
      <section class="panel account-panel reveal"><div id="auth-section"><div class="auth-tabs" role="tablist"><button class="auth-tab is-selected" type="button" data-mode="login">Đăng nhập</button><button class="auth-tab" type="button" data-mode="signup">Tạo tài khoản</button></div><form id="auth-form" class="stack-form"><label for="display-name" id="display-name-label" hidden>Tên hiển thị</label><input id="display-name" name="displayName" maxlength="40" placeholder="Tên hiển thị" hidden><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required><label for="password">Mật khẩu</label><input id="password" name="password" type="password" minlength="8" autocomplete="current-password" required><button class="button button-dark" type="submit" id="auth-submit">Đăng nhập <span aria-hidden="true">→</span></button><p class="form-message" id="auth-message" role="status"></p></form></div><div id="profile-section" hidden><p class="eyebrow">HỒ SƠ CỦA BẠN</p><h2 id="profile-email"></h2><form id="profile-form" class="stack-form"><label for="profile-display-name">Tên hiển thị</label><input id="profile-display-name" name="displayName" maxlength="40" required><button class="button button-dark" type="submit">Lưu thay đổi <span aria-hidden="true">→</span></button><p class="form-message" id="profile-message" role="status"></p></form><p class="muted">Tên hiển thị không được đính kèm vào bài viết ẩn danh.</p><button class="text-link signout-button" id="signout-button" type="button">Đăng xuất <span aria-hidden="true">↗</span></button></div></section>`;
  },
  gan(dauRa) {
    const bieuMau = dauRa.querySelector('#auth-form');
    const thongBao = dauRa.querySelector('#auth-message');
    const oTen = dauRa.querySelector('#display-name');
    const nhanTen = dauRa.querySelector('#display-name-label');
    const nutGui = dauRa.querySelector('#auth-submit');
    const nutDangXuat = dauRa.querySelector('#signout-button');
    const khuVucXacThuc = dauRa.querySelector('#auth-section');
    const khuVucHoSo = dauRa.querySelector('#profile-section');
    const bieuMauHoSo = dauRa.querySelector('#profile-form');
    const thongBaoHoSo = dauRa.querySelector('#profile-message');
    const hienThiHoSo = async () => {
      khuVucXacThuc.hidden = true;
      khuVucHoSo.hidden = false;
      try {
        const { user: nguoiDung, profile: hoSo } = await guiYeuCauApi('/auth/me');
        dauRa.querySelector('#profile-email').textContent = nguoiDung.email || 'Tài khoản MindCare';
        dauRa.querySelector('#profile-display-name').value = hoSo.display_name;
      } catch (loi) {
        thongBaoHoSo.textContent = loi.message;
      }
    };
    let cheDo = 'login';
    const datCheDo = (cheDoMoi) => {
      cheDo = cheDoMoi;
      const dangKy = cheDo === 'signup';
      oTen.hidden = nhanTen.hidden = !dangKy;
      oTen.required = dangKy;
      dauRa.querySelectorAll('[data-mode]').forEach((theChon) => theChon.classList.toggle('is-selected', theChon.dataset.mode === cheDo));
      nutGui.innerHTML = dangKy ? 'Tạo tài khoản <span aria-hidden="true">→</span>' : 'Đăng nhập <span aria-hidden="true">→</span>';
      dauRa.querySelector('#password').autocomplete = dangKy ? 'new-password' : 'current-password';
    };
    dauRa.querySelectorAll('[data-mode]').forEach((theChon) => theChon.addEventListener('click', () => datCheDo(theChon.dataset.mode)));
    if (localStorage.getItem('mindcare_access_token')) hienThiHoSo();
    bieuMau.addEventListener('submit', async (suKien) => {
      suKien.preventDefault();
      const duLieuBieuMau = new FormData(bieuMau);
      try {
        const ketQua = await guiYeuCauApi(`/auth/${cheDo}`, {
          method: 'POST',
          body: JSON.stringify({ email: duLieuBieuMau.get('email'), password: duLieuBieuMau.get('password'), displayName: duLieuBieuMau.get('displayName') })
        });
        if (ketQua.session?.access_token) {
          localStorage.setItem('mindcare_access_token', ketQua.session.access_token);
          await hienThiHoSo();
        } else {
          thongBao.textContent = 'Kiểm tra email để xác nhận tài khoản, sau đó đăng nhập.';
        }
      } catch (loi) {
        thongBao.textContent = loi.message;
      }
    });
    bieuMauHoSo.addEventListener('submit', async (suKien) => {
      suKien.preventDefault();
      const duLieuBieuMau = new FormData(bieuMauHoSo);
      try {
        await guiYeuCauApi('/auth/me', { method: 'PATCH', body: JSON.stringify({ displayName: duLieuBieuMau.get('displayName') }) });
        thongBaoHoSo.textContent = 'Tên hiển thị đã được cập nhật.';
      } catch (loi) {
        thongBaoHoSo.textContent = loi.message;
      }
    });
    nutDangXuat.addEventListener('click', () => {
      localStorage.removeItem('mindcare_access_token');
      khuVucHoSo.hidden = true;
      khuVucXacThuc.hidden = false;
      thongBao.textContent = 'Bạn đã đăng xuất.';
    });
  }
};
