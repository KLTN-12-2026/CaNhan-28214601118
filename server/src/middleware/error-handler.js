function xuLyLoi(loi, _yeuCau, phanHoi, _chuyenTiep) {
  console.error(loi);
  phanHoi.status(loi.status || 500).json({
    error: loi.status ? loi.message : 'An unexpected server error occurred.'
  });
}

module.exports = xuLyLoi;
