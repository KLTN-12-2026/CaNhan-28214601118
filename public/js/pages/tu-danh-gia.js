const cacMucDiemBa = [
  { giaTri: 0, nhan: '0' },
  { giaTri: 1, nhan: '1' },
  { giaTri: 2, nhan: '2' },
  { giaTri: 3, nhan: '3' }
];

const cacMucDASS = [
  { giaTri: 0, nhan: 'Không đúng chút nào' },
  { giaTri: 1, nhan: 'Đúng một phần' },
  { giaTri: 2, nhan: 'Đúng phần lớn' },
  { giaTri: 3, nhan: 'Rất đúng' }
];

const cacMucHaiTuan = [
  { giaTri: 0, nhan: 'Không lúc nào' },
  { giaTri: 1, nhan: 'Vài ngày' },
  { giaTri: 2, nhan: 'Hơn một nửa số ngày' },
  { giaTri: 3, nhan: 'Hầu như mỗi ngày' }
];

const cacMucGAD = [
  { giaTri: 0, nhan: 'Không có gì' },
  { giaTri: 1, nhan: 'Vài ngày' },
  { giaTri: 2, nhan: 'Hơn nửa số ngày' },
  { giaTri: 3, nhan: 'Gần như mỗi ngày' }
];

const cacMucWHO = [
  { giaTri: 0, nhan: 'Không có lúc nào' },
  { giaTri: 1, nhan: 'Một phần thời gian' },
  { giaTri: 2, nhan: 'Dưới nửa thời gian' },
  { giaTri: 3, nhan: 'Hơn nửa thời gian' },
  { giaTri: 4, nhan: 'Hầu hết thời gian' },
  { giaTri: 5, nhan: 'Toàn bộ thời gian' }
];

const cacMucPSQITanSuat = [
  { giaTri: 0, nhan: 'Không có trong tháng qua' },
  { giaTri: 1, nhan: 'Ít hơn 1 lần/tuần' },
  { giaTri: 2, nhan: '1-2 lần/tuần' },
  { giaTri: 3, nhan: 'Từ 3 lần/tuần' }
];

const cacMucPSQIChatLuong = [
  { giaTri: 0, nhan: 'Rất tốt' },
  { giaTri: 1, nhan: 'Tương đối tốt' },
  { giaTri: 2, nhan: 'Tương đối kém' },
  { giaTri: 3, nhan: 'Rất kém' }
];

const cacMucAnhHuong = [
  { giaTri: 0, nhan: 'Không khó khăn' },
  { giaTri: 1, nhan: 'Đôi khi khó khăn' },
  { giaTri: 2, nhan: 'Rất khó khăn' },
  { giaTri: 3, nhan: 'Cực kỳ khó khăn' }
];

const cacBaiDanhGia = [
  {
    ma: 'dass-21',
    tieuDe: 'DASS-21',
    phuDe: 'Trầm cảm · Lo âu · Stress',
    thoiGian: 'Tuần qua',
    huongDan: 'Hãy chọn mức độ đúng với bạn trong tuần qua.',
    loai: 'dass',
    cauHoi: [
      'Tôi thấy khó mà thoải mái được',
      'Tôi bị khô miệng',
      'Tôi không thấy có chút cảm xúc tích cực nào',
      'Tôi bị rối loạn nhịp thở (thở gấp, khó thở dù không vận động nặng)',
      'Tôi thấy khó bắt tay vào công việc',
      'Tôi có xu hướng phản ứng thái quá với mọi tình huống',
      'Tôi bị đổ mồ hôi (chẳng hạn mồ hôi tay)',
      'Tôi thấy mình đang suy nghĩ quá nhiều',
      'Tôi lo lắng về những tình huống có thể khiến tôi hoảng sợ hoặc tự biến mình thành trò cười',
      'Tôi thấy mình chẳng có gì để mong đợi cả',
      'Tôi thấy bản thân dễ bị kích động',
      'Tôi thấy khó thư giãn được',
      'Tôi cảm thấy chán nản, thất vọng',
      'Tôi không chấp nhận được việc có cái gì đó xen vào cản trở việc tôi đang làm',
      'Tôi thấy mình gần như hoảng loạn',
      'Tôi không thấy hăng hái với bất kỳ việc gì nữa',
      'Tôi cảm thấy mình chẳng đáng làm người',
      'Tôi thấy mình khá dễ phật ý, tự ái',
      'Tôi nghe thấy rõ tiếng nhịp tim dù không vận động (tim đập nhanh, hụt nhịp)',
      'Tôi hay sợ vô cớ',
      'Tôi thấy cuộc sống vô nghĩa'
    ]
  },
  {
    ma: 'phq-9',
    tieuDe: 'PHQ-9',
    phuDe: 'Sàng lọc trầm cảm',
    thoiGian: '2 tuần qua',
    huongDan: 'Trong 2 tuần qua, bạn có thường gặp phải các vấn đề sau đây không?',
    loai: 'phq',
    cauHoi: [
      'Ít quan tâm hoặc thích thú trong mọi công việc',
      'Cảm thấy thất vọng, chán nản hoặc không còn hy vọng',
      'Khó ngủ hoặc ngủ rất nhiều',
      'Cảm thấy mệt mỏi hoặc kiệt sức',
      'Chán ăn hoặc ăn quá nhiều',
      'Cảm thấy bản thân thất bại, vô dụng hoặc cảm thấy đã làm cho bản thân và gia đình thất vọng',
      'Khó tập trung vào công việc, chẳng hạn như đọc báo hay xem TV',
      'Di chuyển hoặc nói chuyện quá chậm chạp đến mức mọi người có thể nhận ra. Hoặc cảm thấy bứt rứt, không yên đến mức cử động nhiều hơn bình thường',
      'Có ý nghĩ muốn chết đi cho xong hoặc có ý muốn tự làm tổn thương bản thân'
    ]
  },
  {
    ma: 'gad-7',
    tieuDe: 'GAD-7',
    phuDe: 'Sàng lọc lo âu lan tỏa',
    thoiGian: '2 tuần qua',
    huongDan: 'Trong 2 tuần qua, bạn có thường xuyên bị làm phiền bởi những vấn đề sau đây không?',
    loai: 'gad',
    cauHoi: [
      'Cảm thấy lo lắng, bồn chồn hoặc căng thẳng quá mức',
      'Không thể dừng lại hoặc kiểm soát sự lo lắng',
      'Lo lắng quá nhiều về những điều khác nhau',
      'Gặp khó khăn trong việc thư giãn',
      'Bồn chồn đến mức khó ngồi yên một chỗ',
      'Dễ bị trở nên cáu gắt hoặc bực mình',
      'Cảm thấy sợ hãi như thể có điều gì đó tồi tệ sắp xảy ra'
    ]
  },
  {
    ma: 'who-5',
    tieuDe: 'WHO-5',
    phuDe: 'Chỉ số sức khỏe tinh thần',
    thoiGian: '2 tuần qua',
    huongDan: 'Trong 2 tuần qua, bạn cảm thấy như thế nào?',
    loai: 'who',
    cauHoi: [
      'Tôi cảm thấy vui vẻ và tinh thần thoải mái',
      'Tôi cảm thấy bình tĩnh và thư thái',
      'Tôi cảm thấy năng động và tràn đầy năng lượng',
      'Tôi thức dậy với cảm giác tỉnh táo và sảng khoái',
      'Cuộc sống hàng ngày của tôi có nhiều điều thú vị'
    ]
  },
  {
    ma: 'psqi',
    tieuDe: 'PSQI',
    phuDe: 'Chỉ số chất lượng giấc ngủ Pittsburgh',
    thoiGian: 'Tháng vừa qua',
    huongDan: 'Các câu hỏi sau liên quan đến thói quen đi ngủ của bạn trong tháng vừa qua.',
    loai: 'psqi'
  }
];

function taoLuaChon(cauHoi, cacMuc, maCauHoi, soThuTu) {
  const lopSoLuaChon = cacMuc.length === 6 ? ' rating-row-six' : '';
  return `
    <fieldset>
      <legend>${soThuTu ? `${soThuTu}. ` : ''}${cauHoi}</legend>
      <div class="rating-row${lopSoLuaChon}">
        ${cacMuc.map((muc) => `
          <label>
            <input type="radio" name="cau-${maCauHoi}" value="${muc.giaTri}" required>
            <span>${muc.giaTri}</span>
            <small>${muc.nhan}</small>
          </label>`).join('')}
      </div>
    </fieldset>`;
}

function taoCauHoiThongThuong(baiDanhGia) {
  let cacMuc = cacMucHaiTuan;
  if (baiDanhGia.loai === 'dass') cacMuc = cacMucDASS;
  if (baiDanhGia.loai === 'gad') cacMuc = cacMucGAD;
  if (baiDanhGia.loai === 'who') cacMuc = cacMucWHO;
  return baiDanhGia.cauHoi.map((cauHoi, viTri) =>
    taoLuaChon(cauHoi, cacMuc, `q${viTri + 1}`, viTri + 1)
  ).join('');
}

function taoCauHoiPhu(maBai) {
  const huongDan = maBai === 'phq-9'
    ? 'Câu hỏi bổ sung (không tính điểm): Nếu có gặp phải các vấn đề trên, chúng gây khó khăn như thế nào cho công việc, việc nhà hoặc các mối quan hệ?'
    : 'Câu hỏi bổ sung (không tính điểm): Nếu đã gặp các vấn đề trên, chúng khiến bạn khó khăn như thế nào trong công việc, việc nhà hoặc hòa đồng với người khác?';
  return taoLuaChon(huongDan, cacMucAnhHuong, 'anh-huong', null);
}

function taoNhapPSQI(ma, nhan, thuocTinh) {
  return `<label for="${ma}">${nhan}</label><input id="${ma}" name="${ma}" ${thuocTinh} required>`;
}

function taoCauHoiPSQI() {
  const cacVanDe = [
    ['a', 'Không thể ngủ được trong vòng 30 phút'],
    ['b', 'Tỉnh dậy lúc nửa đêm hoặc quá sớm vào buổi sáng'],
    ['c', 'Phải thức dậy để đi vệ sinh'],
    ['d', 'Khó thở'],
    ['e', 'Ho hoặc ngáy to'],
    ['f', 'Cảm thấy rất lạnh'],
    ['g', 'Cảm thấy rất nóng'],
    ['h', 'Có ác mộng'],
    ['i', 'Thấy đau'],
    ['k', 'Lý do khác']
  ];
  const cacCauHoiTanSuat = cacVanDe.map(([ma, vanDe]) =>
    taoLuaChon(`5${ma}. ${vanDe}${ma === 'k' ? ' (mô tả nếu có)' : ''}`, cacMucPSQITanSuat, `psqi-${ma}`, null)
  ).join('');

  return `
    <p class="eyebrow">PHẦN A · CÂU HỎI MỞ</p>
    ${taoNhapPSQI('psqi-gio-ngu', '1. Bạn thường lên giường đi ngủ lúc mấy giờ?', 'type="time"')}
    ${taoNhapPSQI('psqi-phut-vao-giac', '2. Mỗi đêm bạn thường mất bao nhiêu phút mới chợp mắt được?', 'type="number" min="0" max="600" step="1"')}
    ${taoNhapPSQI('psqi-gio-thuc', '3. Bạn thường thức giấc buổi sáng lúc mấy giờ?', 'type="time"')}
    ${taoNhapPSQI('psqi-so-gio-ngu', '4. Mỗi đêm bạn thường ngủ được mấy tiếng đồng hồ?', 'type="number" min="0.1" max="24" step="0.1"')}
    <p class="eyebrow">PHẦN B · TẦN SUẤT VẤN ĐỀ GIẤC NGỦ</p>
    <p class="muted">0 = Không có trong tháng qua · 1 = Ít hơn 1 lần/tuần · 2 = 1-2 lần/tuần · 3 = Từ 3 lần/tuần</p>
    ${cacCauHoiTanSuat}
    <label for="psqi-ly-do-khac">Mô tả lý do khác (không bắt buộc)</label>
    <input id="psqi-ly-do-khac" name="psqi-ly-do-khac" maxlength="300">
    ${taoLuaChon('6. Trong tháng qua, bạn có thường phải sử dụng thuốc ngủ không (theo đơn hoặc tự mua)?', cacMucPSQITanSuat, 'psqi-thuoc-ngu', 6)}
    ${taoLuaChon('7. Trong tháng qua, bạn có hay gặp khó khăn để giữ đầu óc tỉnh táo khi lái xe, ăn uống hoặc tham gia hoạt động xã hội?', cacMucPSQITanSuat, 'psqi-tinh-tao', 7)}
    ${taoLuaChon('8. Trong tháng qua, bạn có gặp khó khăn để duy trì hứng thú hoàn thành công việc không?', cacMucPSQITanSuat, 'psqi-hung-thu', 8)}
    ${taoLuaChon('9. Trong tháng qua, nhìn chung bạn đánh giá chất lượng giấc ngủ của mình như thế nào?', cacMucPSQIChatLuong, 'psqi-chat-luong', 9)}`;
}

function layDiem(bieuMau, maCauHoi) {
  return Number(new FormData(bieuMau).get(`cau-${maCauHoi}`));
}

function taoKetQuaDASS(bieuMau) {
  const cacThangDo = [
    { ten: 'Trầm cảm', cacCau: [3, 5, 10, 13, 16, 17, 21] },
    { ten: 'Lo âu', cacCau: [2, 4, 7, 9, 15, 19, 20] },
    { ten: 'Stress', cacCau: [1, 6, 8, 11, 12, 14, 18] }
  ];
  const cacKetQua = cacThangDo.map((thangDo) => {
    const tongDiem = thangDo.cacCau.reduce((tong, soCau) => tong + layDiem(bieuMau, `q${soCau}`), 0) * 2;
    return `<li><strong>${thangDo.ten}:</strong> ${tongDiem} / 42</li>`;
  }).join('');
  return `<p class="eyebrow">ĐIỂM DASS-21 (QUY ĐỔI ×2)</p><ul>${cacKetQua}</ul><p>Điểm từng thang được tính bằng tổng 7 câu tương ứng nhân 2.</p>`;
}

function taoKetQuaPHQ(bieuMau) {
  const tongDiem = Array.from({ length: 9 }, (_, viTri) => layDiem(bieuMau, `q${viTri + 1}`))
    .reduce((tong, diem) => tong + diem, 0);
  const diemCauAnToan = layDiem(bieuMau, 'q9');
  const nhanXet = tongDiem >= 5
    ? 'Tổng điểm từ 5 trở lên: khuyến nghị trao đổi với bác sĩ chuyên khoa.'
    : 'Điểm hiện dưới ngưỡng khuyến nghị 5; kết quả này không loại trừ khó khăn bạn đang gặp.';
  const canhBaoAnToan = diemCauAnToan > 0
    ? '<div class="assessment-safety" role="alert"><strong>Câu trả lời ở câu 9 cần được quan tâm ngay.</strong><p>Hãy nói với người bạn tin tưởng và liên hệ chuyên gia y tế sớm. Nếu bạn đang có nguy cơ làm hại bản thân hoặc không thể giữ an toàn, hãy đến cơ sở cấp cứu gần nhất hoặc gọi 115.</p><a class="button button-danger" href="tel:115">Gọi cấp cứu 115</a></div>'
    : '';
  return `<p class="eyebrow">KẾT QUẢ PHQ-9</p><h2>${tongDiem} / 27</h2><p>${nhanXet}</p>${canhBaoAnToan}`;
}

function taoKetQuaGAD(bieuMau) {
  const tongDiem = Array.from({ length: 7 }, (_, viTri) => layDiem(bieuMau, `q${viTri + 1}`))
    .reduce((tong, diem) => tong + diem, 0);
  let mucDo = 'Không có biểu hiện theo các câu trả lời';
  if (tongDiem >= 1 && tongDiem <= 4) mucDo = 'Lo âu tối thiểu';
  if (tongDiem >= 5 && tongDiem <= 9) mucDo = 'Lo âu nhẹ';
  if (tongDiem >= 10 && tongDiem <= 14) mucDo = 'Lo âu trung bình';
  if (tongDiem >= 15) mucDo = 'Lo âu trung bình đến nặng';
  return `<p class="eyebrow">KẾT QUẢ GAD-7</p><h2>${tongDiem} / 21 · ${mucDo}</h2>`;
}

function taoKetQuaWHO(bieuMau) {
  const tongTho = Array.from({ length: 5 }, (_, viTri) => layDiem(bieuMau, `q${viTri + 1}`))
    .reduce((tong, diem) => tong + diem, 0);
  return `<p class="eyebrow">KẾT QUẢ WHO-5</p><h2>${tongTho * 4} / 100</h2><p>Điểm thô ${tongTho} / 25 × 4. Điểm càng cao, sức khỏe tinh thần tự đánh giá càng tốt.</p>`;
}

function diemThanhPhan(tong) {
  if (tong === 0) return 0;
  if (tong <= 2) return 1;
  if (tong <= 4) return 2;
  return 3;
}

function phutTrongNgay(gio) {
  const [gioTrongNgay, phut] = gio.split(':').map(Number);
  return gioTrongNgay * 60 + phut;
}

function taoKetQuaPSQI(bieuMau) {
  const duLieu = new FormData(bieuMau);
  const gioLenGiuong = phutTrongNgay(duLieu.get('psqi-gio-ngu'));
  let gioThucDay = phutTrongNgay(duLieu.get('psqi-gio-thuc'));
  if (gioThucDay <= gioLenGiuong) gioThucDay += 24 * 60;
  const thoiGianTrenGiuong = (gioThucDay - gioLenGiuong) / 60;
  const soGioNgu = Number(duLieu.get('psqi-so-gio-ngu'));
  if (soGioNgu > thoiGianTrenGiuong) {
    return { loi: 'Số giờ ngủ không thể lớn hơn khoảng thời gian từ lúc lên giường đến khi thức dậy. Vui lòng kiểm tra lại giờ và số giờ ngủ.' };
  }

  const diemTreVaoGiac = Number(duLieu.get('psqi-phut-vao-giac')) <= 15 ? 0
    : Number(duLieu.get('psqi-phut-vao-giac')) <= 30 ? 1
      : Number(duLieu.get('psqi-phut-vao-giac')) <= 60 ? 2 : 3;
  const diemKhoVaoGiac = diemThanhPhan(diemTreVaoGiac + Number(duLieu.get('cau-psqi-a')));
  const diemThoiLuong = soGioNgu > 7 ? 0 : soGioNgu >= 6 ? 1 : soGioNgu >= 5 ? 2 : 3;
  const hieuSuatNgu = soGioNgu / thoiGianTrenGiuong * 100;
  const diemHieuSuat = hieuSuatNgu >= 85 ? 0 : hieuSuatNgu >= 75 ? 1 : hieuSuatNgu >= 65 ? 2 : 3;
  const diemGianDoan = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k']
    .reduce((tong, ma) => tong + Number(duLieu.get(`cau-psqi-${ma}`)), 0);
  const diemRoiLoan = diemGianDoan === 0 ? 0 : diemGianDoan <= 9 ? 1 : diemGianDoan <= 18 ? 2 : 3;
  const diemThuocNgu = Number(duLieu.get('cau-psqi-thuoc-ngu'));
  const diemBanNgay = diemThanhPhan(
    Number(duLieu.get('cau-psqi-tinh-tao')) + Number(duLieu.get('cau-psqi-hung-thu'))
  );
  const cacDiem = [
    Number(duLieu.get('cau-psqi-chat-luong')),
    diemKhoVaoGiac,
    diemThoiLuong,
    diemHieuSuat,
    diemRoiLoan,
    diemThuocNgu,
    diemBanNgay
  ];
  const tongDiem = cacDiem.reduce((tong, diem) => tong + diem, 0);
  const cacTenThanhPhan = ['Chất lượng chủ quan', 'Thời gian vào giấc', 'Thời lượng ngủ', 'Hiệu suất ngủ', 'Rối loạn giấc ngủ', 'Sử dụng thuốc ngủ', 'Ảnh hưởng ban ngày'];
  const danhSachDiem = cacDiem.map((diem, viTri) => `<li>${cacTenThanhPhan[viTri]}: ${diem} / 3</li>`).join('');
  const nhanXet = tongDiem <= 5 ? 'Tổng điểm ≤ 5: chất lượng giấc ngủ tốt theo ngưỡng trong tài liệu.' : 'Tổng điểm > 5: chất lượng giấc ngủ kém theo ngưỡng trong tài liệu.';
  return { noiDung: `<p class="eyebrow">KẾT QUẢ PSQI</p><h2>${tongDiem} / 21</h2><p>${nhanXet}</p><ul>${danhSachDiem}</ul>` };
}

function taoNoiDungKetQua(baiDanhGia, bieuMau) {
  if (baiDanhGia.loai === 'dass') return taoKetQuaDASS(bieuMau);
  if (baiDanhGia.loai === 'phq') return taoKetQuaPHQ(bieuMau);
  if (baiDanhGia.loai === 'gad') return taoKetQuaGAD(bieuMau);
  if (baiDanhGia.loai === 'who') return taoKetQuaWHO(bieuMau);
  return taoKetQuaPSQI(bieuMau);
}

export const trangBaiTest = {
  ve() {
    return `
      <section class="page-heading reveal">
        <div><p class="eyebrow">LẮNG NGHE CHÍNH MÌNH</p><h1>Bài tự đánh giá</h1><p class="muted">Chọn một bộ câu hỏi để tự nhìn lại sức khỏe tinh thần. Câu trả lời chỉ được dùng để tính kết quả trên thiết bị này.</p></div>
        <span class="date-stamp">BỘ CÂU HỎI<br><strong>05</strong></span>
      </section>
      <section class="assessment-list" aria-label="Chọn bài tự đánh giá">
        ${cacBaiDanhGia.map((baiDanhGia) => `
          <button class="assessment-choice reveal" type="button" data-assessment="${baiDanhGia.ma}">
            <span class="eyebrow">${baiDanhGia.thoiGian}</span>
            <strong>${baiDanhGia.tieuDe}</strong>
            <small>${baiDanhGia.phuDe}</small>
            <span>Bắt đầu <span aria-hidden="true">→</span></span>
          </button>`).join('')}
      </section>
      <section class="panel assessment-panel" id="assessment-panel" hidden>
        <p class="eyebrow" id="assessment-period"></p>
        <h2 id="assessment-title"></h2>
        <p class="muted" id="assessment-instructions"></p>
        <form id="assessment-form" class="stack-form">
          <div id="assessment-questions"></div>
          <p class="form-message" id="assessment-message" role="alert"></p>
          <div class="assessment-actions">
            <button class="button button-dark" type="submit">Xem kết quả</button>
            <button class="text-link" id="assessment-back" type="button">Chọn bài khác</button>
          </div>
        </form>
      </section>
      <section class="assessment-result" id="assessment-result" aria-live="polite" hidden></section>
      <aside class="assessment-note"><p><strong>Lưu ý:</strong> Đây là công cụ tự sàng lọc, không chẩn đoán và không thay thế chuyên gia y tế. Câu trả lời không được lưu hoặc gửi tới AI. Nếu bạn thấy không an toàn hoặc cần trợ giúp khẩn cấp, hãy dùng nút “Cần giúp ngay”.</p></aside>`;
  },

  gan(dauRa) {
    const danhSachBai = dauRa.querySelector('.assessment-list');
    const bangCauHoi = dauRa.querySelector('#assessment-panel');
    const bieuMau = dauRa.querySelector('#assessment-form');
    const thongBao = dauRa.querySelector('#assessment-message');
    const ketQua = dauRa.querySelector('#assessment-result');
    const danhSachLuaChon = [...dauRa.querySelectorAll('[data-assessment]')];
    let baiDanhGiaDangChon;

    function chonBaiDanhGia(maBai) {
      baiDanhGiaDangChon = cacBaiDanhGia.find((baiDanhGia) => baiDanhGia.ma === maBai);
      if (!baiDanhGiaDangChon) return;
      dauRa.querySelector('#assessment-period').textContent = baiDanhGiaDangChon.thoiGian;
      dauRa.querySelector('#assessment-title').textContent = `${baiDanhGiaDangChon.tieuDe} · ${baiDanhGiaDangChon.phuDe}`;
      dauRa.querySelector('#assessment-instructions').textContent = baiDanhGiaDangChon.huongDan;
      const cacCauHoi = baiDanhGiaDangChon.loai === 'psqi'
        ? taoCauHoiPSQI()
        : `${taoCauHoiThongThuong(baiDanhGiaDangChon)}${['phq-9', 'gad-7'].includes(baiDanhGiaDangChon.ma) ? taoCauHoiPhu(baiDanhGiaDangChon.ma) : ''}`;
      dauRa.querySelector('#assessment-questions').innerHTML = cacCauHoi;
      thongBao.textContent = '';
      danhSachBai.hidden = true;
      bangCauHoi.hidden = false;
      ketQua.hidden = true;
      bangCauHoi.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    danhSachLuaChon.forEach((luaChon) => {
      luaChon.addEventListener('click', () => chonBaiDanhGia(luaChon.dataset.assessment));
    });

    dauRa.querySelector('#assessment-back').addEventListener('click', () => {
      bangCauHoi.hidden = true;
      ketQua.hidden = true;
      danhSachBai.hidden = false;
    });

    bieuMau.addEventListener('submit', (suKien) => {
      suKien.preventDefault();
      thongBao.textContent = '';
      const ketQuaBai = taoNoiDungKetQua(baiDanhGiaDangChon, bieuMau);
      if (typeof ketQuaBai === 'object' && ketQuaBai.loi) {
        thongBao.textContent = ketQuaBai.loi;
        return;
      }
      const noiDungKetQua = typeof ketQuaBai === 'string' ? ketQuaBai : ketQuaBai.noiDung;
      ketQua.innerHTML = `<p class="eyebrow">KẾT QUẢ TỰ ĐÁNH GIÁ</p>${noiDungKetQua}<p>Kết quả này chỉ là thông tin tham khảo; hãy trao đổi với chuyên gia nếu các vấn đề ảnh hưởng đến cuộc sống của bạn.</p>`;
      ketQua.hidden = false;
      ketQua.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
};