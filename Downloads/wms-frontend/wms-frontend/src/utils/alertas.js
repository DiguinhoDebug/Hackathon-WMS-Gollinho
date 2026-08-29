import Swal from 'sweetalert2';

/**
 * Instância única do SweetAlert2 com as classes de estilo azul/branco
 * do WMS Gollinho aplicadas (ver src/index.css).
 */
export const alertaWms = Swal.mixin({
  customClass: {
    popup: 'wms-swal-popup',
    confirmButton: 'wms-swal-confirm',
    cancelButton: 'wms-swal-cancel',
    denyButton: 'wms-swal-deny',
  },
  buttonsStyling: false,
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
  reverseButtons: true,
});

export function alertaSucesso(titulo, texto) {
  return alertaWms.fire({ icon: 'success', title: titulo, text: texto, timer: 2200, showConfirmButton: false });
}

export function alertaErro(titulo, texto) {
  return alertaWms.fire({ icon: 'error', title: titulo || 'Ocorreu um erro', text: texto });
}

export function alertaConfirmacao({ titulo, texto, confirmarTexto = 'Confirmar', icone = 'warning' }) {
  return alertaWms.fire({
    icon: icone,
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: confirmarTexto,
  });
}
