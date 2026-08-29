package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.NotNull;

public record PrateleiraRequestDTO(

        @NotNull(message = "Informe o andar da prateleira")
        Integer andar,
        @NotNull(message = "Informe o coluna da prateleira")
        Integer coluna,
        @NotNull(message = "Informe o corredor do produto")
        Integer corredor,
        @NotNull (message = "informe o id")
        String idProduto,
        @NotNull(message = "Informe a quantidade")
        Integer quantidade
) {}
