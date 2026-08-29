package com.hackathon.golinhowms.dto;

import com.hackathon.golinhowms.model.Estados;

public record EnderecoResponseDTO(
        Long idEndereco,
        String nomeRua,
        String numeroRua,
        String bairro,
        String cidade,
        Estados estados
) {
}
