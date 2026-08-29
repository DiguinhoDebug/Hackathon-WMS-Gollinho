package com.hackathon.golinhowms.dto;

public record PrateleiraResponseDTO(
        Long idPrateleira,
        Integer andar,
        Integer coluna,
        Integer corredor,
        Integer quantidade,
        Long idProduto,
        String nomeProduto
) {}