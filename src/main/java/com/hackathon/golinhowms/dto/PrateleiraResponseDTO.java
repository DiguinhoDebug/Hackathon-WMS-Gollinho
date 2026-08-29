package com.hackathon.golinhowms.dto;

public record PrateleiraResponseDTO(
   Long idPrateleira,
   Integer andar,
   Integer coluna,
   Integer corredor,
   String nomeProduto,
   Integer quantidade
) {}
