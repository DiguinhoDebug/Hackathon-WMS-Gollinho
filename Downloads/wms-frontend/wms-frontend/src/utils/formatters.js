// Aplica máscara de CNPJ enquanto o usuário digita: 00.000.000/0000-00
export function mascaraCnpj(valor = '') {
  return valor
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export function formatarData(dataIso) {
  if (!dataIso) return '-';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return dataIso;
  return data.toLocaleDateString('pt-BR');
}

export function formatarHora(hora) {
  if (!hora) return '-';
  // aceita "HH:mm:ss" ou "HH:mm"
  return hora.slice(0, 5);
}

export function formatarDataHora(dataIso, hora) {
  return `${formatarData(dataIso)} ${hora ? formatarHora(hora) : ''}`.trim();
}
