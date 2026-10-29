import { batDauBoDinhTuyen } from './router.js';

const hopThoatKhancap = document.querySelector('#panic-dialog');
document.querySelector('#panic-trigger').addEventListener('click', () => hopThoatKhancap.showModal());
document.querySelector('#panic-close').addEventListener('click', () => hopThoatKhancap.close());
hopThoatKhancap.addEventListener('click', (suKien) => {
  if (suKien.target === hopThoatKhancap) hopThoatKhancap.close();
});

batDauBoDinhTuyen();
