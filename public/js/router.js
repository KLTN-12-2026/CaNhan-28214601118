import { trangTongQuan } from './pages/dashboard.js';
import { trangCongDong } from './pages/community.js';
import { trangCheckIn } from './pages/check-in.js';
import { trangThuVien } from './pages/library.js';
import { trangTaiKhoan } from './pages/account.js';
import { trangBaiTest } from './pages/tu-danh-gia.js';

const cacTuyen = {
  '/': trangTongQuan,
  '/community': trangCongDong,
  '/check-in': trangCheckIn,
  '/bai-test': trangBaiTest,
  '/library': trangThuVien,
  '/account': trangTaiKhoan
};

export function batDauBoDinhTuyen() {
  const dauRa = document.querySelector('#app');
  let donDep = () => {};

  function veTrang() {
    donDep();
    const duongDan = window.location.hash.slice(1).split('?')[0] || '/';
    const trang = cacTuyen[duongDan] || trangTongQuan;
    dauRa.innerHTML = trang.ve();
    donDep = trang.gan?.(dauRa) || (() => {});
    document.querySelectorAll('[data-route]').forEach((lienKet) => {
      lienKet.classList.toggle('is-active', lienKet.dataset.route === duongDan);
    });
    dauRa.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', veTrang);
  veTrang();
}
