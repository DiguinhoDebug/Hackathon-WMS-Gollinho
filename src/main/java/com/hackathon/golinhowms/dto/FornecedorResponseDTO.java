package com.hackathon.golinhowms.dto;

public record FornecedorResponseDTO(
        Long idFornecedor,
        String razaoSocial,
        String nomeFantasia,
        String cnpj,
        Boolean status,
        Long idEndereco
) {}
