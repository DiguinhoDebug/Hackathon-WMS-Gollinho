package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.EntradaRequestDTO;
import com.hackathon.golinhowms.dto.EntradaResponseDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Entrada;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.EntradaRepository;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EntradaService {
    private final EntradaRepository repository;
    private final FornecedorRepository fornecedorRepository;
    private final ProdutoRepository produtoRepository;

    public EntradaService(EntradaRepository repository, FornecedorRepository fornecedorRepository, ProdutoRepository produtoRepository) {
        this.repository = repository;
        this.fornecedorRepository = fornecedorRepository;
        this.produtoRepository = produtoRepository;
    }

    private EntradaResponseDTO toResponse(Entrada entrada){
        return new EntradaResponseDTO(
                entrada.getIdEntrada(),
                entrada.getDataHora(),
                entrada.getProduto(),
                entrada.getFornecedor(),
                entrada.getQuantidade()
        );
    }

    private Entrada toEntity(EntradaRequestDTO dto) {
        Produto produto = produtoRepository.findById(dto.idProduto())
                .orElseThrow(() -> new RecursoNaoEncontrado(
                        "ID do produto não encontrado: " + dto.idProduto()));

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RecursoNaoEncontrado(
                        "ID do fornecedor não encontrado: " + dto.idFornecedor()));

        Entrada entrada = new Entrada();
        entrada.setProduto(produto);
        entrada.setFornecedor(fornecedor);
        entrada.setQuantidade(dto.quantidade());

        return entrada;
    }

    public List<EntradaResponseDTO> listar(){
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public Entrada pegarId(Long id){
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID da entrada não encontrada"));
    }

    public EntradaResponseDTO buscarId(Long id){
        return toResponse(pegarId(id));
    }

    public EntradaResponseDTO salvar(EntradaRequestDTO dto){
        Entrada entrada = toEntity(dto);
        Entrada salvo = repository.save(entrada);
        return toResponse(salvo);
    }

    public EntradaResponseDTO atualizar(Long id, EntradaRequestDTO dto){
        Entrada entrada = pegarId(id);

        Produto produto = produtoRepository.findById(dto.idProduto())
                .orElseThrow(() -> new RecursoNaoEncontrado(
                        "ID do produto não encontrado: " + dto.idProduto()));

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RecursoNaoEncontrado(
                        "ID do fornecedor não encontrado: " + dto.idFornecedor()));

        entrada.setProduto(produto);
        entrada.setFornecedor(fornecedor);
        entrada.setQuantidade(dto.quantidade());

        Entrada salvo = repository.save(entrada);
        return toResponse(salvo);
    }

    public List<EntradaResponseDTO> listarPorPeriodo(LocalDateTime de, LocalDateTime ate){
        if (de != null && ate != null && de.isAfter(ate)) {
            throw new IllegalArgumentException("Data 'de' não pode ser depois da data 'até'");
        }
        return repository.findByDataHoraBetween(de, ate).stream().map(this::toResponse).toList();
    }

}
