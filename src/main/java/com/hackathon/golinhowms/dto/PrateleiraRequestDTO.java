package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;

public record PrateleiraRequestDTO(

        @NotNull(message = "Informe o andar da prateleira")
        @Max(value = 4, message = "no maximo 4 andares")
        Integer andar,
        @NotNull(message = "Informe o coluna da prateleira")
        @Max(value = 8, message = "o maximo de colunas é 8")
        Integer coluna,
        @NotNull(message = "Informe o corredor do produto")
        @Max(value = 6, message = "o maximo de corredores é 6")
        Integer corredor,
        @NotNull (message = "informe o id")
        String idProduto,
        @NotNull(message = "Informe a quantidade")
        Integer quantidade
) {}
