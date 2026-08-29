package com.hackathon.golinhowms.dto;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CNPJ;

public record FornecedorRequestDTO(
        @NotNull(message = "Nao pode ser nula")
        String razaoSocial,
        String nomeFantasia,
        @CNPJ
        String cnpj,
        Boolean status,
        Long idEndereco
) {}
