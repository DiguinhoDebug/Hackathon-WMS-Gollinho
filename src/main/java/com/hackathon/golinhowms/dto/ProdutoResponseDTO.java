package com.hackathon.golinhowms.dto;

public record ProdutoResponseDTO(
        Long idProduto,
        String nomeProduto,
        Long idFornecedor,
        String nomeFornecedor,
        Integer quantidade
) {
}
