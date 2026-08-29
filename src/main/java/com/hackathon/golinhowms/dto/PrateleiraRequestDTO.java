package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.NotNull;

public record PrateleiraRequestDTO(

        @NotNull(message = "Informe o andar da prateleira")
        Integer andar,
        @NotNull(message = "Informe o andar da prateleira")
        Integer coluna,
        @NotNull(message = "Informe o andar da prateleira")
        Integer corredor,
        String nomeProduto,
        Integer quantidade
) {}
