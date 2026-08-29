package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record EntradaRequestDTO(
        @NotNull(message = "Declare o id do produto")
        List<Long> idProduto,
        @NotNull(message = "O ID do fornecedor nao pode ser nulo")
        List<Long> idFornecedor,
        @NotNull(message = "A quantidade nao pode ser nula")
        Integer quantidade
) {
}
