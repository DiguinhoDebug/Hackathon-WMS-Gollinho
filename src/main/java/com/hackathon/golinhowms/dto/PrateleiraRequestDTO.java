package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PrateleiraRequestDTO(

        @NotNull(message = "Informe o andar da prateleira")
        @Min(value = 1, message = "o andar mínimo é 1")
        @Max(value = 4, message = "no máximo 4 andares")
        Integer andar,

        @NotNull(message = "Informe a coluna da prateleira")
        @Min(value = 1, message = "a coluna mínima é 1")
        @Max(value = 8, message = "o máximo de colunas é 8")
        Integer coluna,

        @NotNull(message = "Informe o corredor do produto")
        @Min(value = 1, message = "o corredor mínimo é 1")
        @Max(value = 6, message = "o máximo de corredores é 6")
        Integer corredor,

        @NotNull(message = "Informe o id do produto")
        Long idProduto,

        @NotNull(message = "Informe a quantidade")
        Integer quantidade
) {}