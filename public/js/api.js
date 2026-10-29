const DUONG_DAN_API = '/api';

export async function guiYeuCauApi(duongDan, tuyChon = {}) {
  const maTruyCap = localStorage.getItem('mindcare_access_token');
  const phanHoi = await fetch(`${DUONG_DAN_API}${duongDan}`, {
    ...tuyChon,
    headers: {
      'Content-Type': 'application/json',
      ...(maTruyCap ? { Authorization: `Bearer ${maTruyCap}` } : {}),
      ...tuyChon.headers
    }
  });
  const ketQua = await phanHoi.json().catch(() => ({}));
  if (!phanHoi.ok) throw new Error(ketQua.error || 'Không thể kết nối lúc này.');
  return ketQua;
}

export function thoatMaHtml(giaTri = '') {
  return String(giaTri).replace(/[&<>"']/g, (kyTu) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[kyTu]);
}
