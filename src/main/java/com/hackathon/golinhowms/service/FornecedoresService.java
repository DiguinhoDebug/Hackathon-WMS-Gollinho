package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.FornecedorRequestDTO;
import com.hackathon.golinhowms.dto.FornecedorResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Endereco;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.repository.EnderecoRepository;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedoresService {
    private final FornecedorRepository fornecedorRepository;
    private final EnderecoRepository enderecoRepository;

    public FornecedoresService(FornecedorRepository fornecedorRepository, EnderecoRepository enderecoRepository) {
        this.fornecedorRepository = fornecedorRepository;
        this.enderecoRepository = enderecoRepository;
    }

    private FornecedorResponseDTO toResponse(Fornecedor fornecedor) {
        return new FornecedorResponseDTO(
                fornecedor.getIdFornecedor(),
                fornecedor.getRazaoSocial(),
                fornecedor.getNomeFantasia(),
                fornecedor.getCnpj(),
                fornecedor.getStatus(),
                fornecedor.getEnderecos() != null ? fornecedor.getEnderecos().getIdEndereco() : null
        );
    }

    private Fornecedor toEntity(FornecedorRequestDTO dto) {
        Fornecedor fornecedor = new Fornecedor();

        fornecedor.setRazaoSocial(dto.razaoSocial());
        fornecedor.setNomeFantasia(dto.nomeFantasia());
        fornecedor.setCnpj(dto.cnpj());
        fornecedor.setStatus(dto.status());

        if (dto.idEndereco() != null) {
            Endereco endereco = enderecoRepository.findById(dto.idEndereco())
                    .orElseThrow(() -> new RecursoNaoEncontrado("ID do endereço não encontrado: " + dto.idEndereco()));
            fornecedor.setEnderecos(endereco);
        }

        return fornecedor;
    }

    public List<FornecedorResponseDTO> listar() {
        return fornecedorRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Fornecedor pegarId(Long id) {
        return fornecedorRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("ID do fornecedor não encontrado"));
    }

    public FornecedorResponseDTO buscarPorId(Long id) {
        return toResponse(pegarId(id));
    }

    public FornecedorResponseDTO salvar(FornecedorRequestDTO dto) {
        Fornecedor fornecedor = toEntity(dto);
        Fornecedor salvo = fornecedorRepository.save(fornecedor);
        return toResponse(salvo);
    }

    public FornecedorResponseDTO atualizar(Long id, FornecedorRequestDTO dto) {
        Fornecedor fornecedor = pegarId(id);

        fornecedor.setRazaoSocial(dto.razaoSocial());
        fornecedor.setNomeFantasia(dto.nomeFantasia());
        fornecedor.setCnpj(dto.cnpj());
        fornecedor.setStatus(dto.status());

        if (dto.idEndereco() != null) {
            Endereco endereco = enderecoRepository.findById(dto.idEndereco())
                    .orElseThrow(() -> new RecursoNaoEncontrado("ID do endereço não encontrado: " + dto.idEndereco()));
            fornecedor.setEnderecos(endereco);
        }

        Fornecedor atualizado = fornecedorRepository.save(fornecedor);
        return toResponse(atualizado);
    }

    public void deletar(Long id, Boolean flag) {
        Fornecedor fornecedor = pegarId(id);
        fornecedor.setStatus(flag);
        fornecedorRepository.save(fornecedor);
    }
}
