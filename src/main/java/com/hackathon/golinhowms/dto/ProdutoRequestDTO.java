package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProdutoRequestDTO(
        @NotBlank(message = "O nome do produto nao pode ser vazio")
        String nomeProduto,
        @NotNull(message = "O id do fornecedor nao pode ser nulo")
        Long idFornecedor,
        @NotNull(message = "A quantidade nao pode ser nula")
        Long quantidade
) {
}
