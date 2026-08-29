package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.ProdutoRequestDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;

    public ProdutoService(ProdutoRepository produtoRepository, FornecedorRepository fornecedorRepository){
        this.produtoRepository = produtoRepository;
        this.fornecedorRepository = fornecedorRepository;
    }

    private ProdutoResponseDTO toResponse(Produto produto){
        return new ProdutoResponseDTO(
                produto.getIdProduto(),
                produto.getNomeProduto(),
                produto.getFornecedor().getIdFornecedor(),
                produto.getFornecedor().getNomeFantasma()
        );
    }

    private Produto toEntity(ProdutoRequestDTO dto){
        Produto produto = new Produto();

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RecursoNaoEncontrado("Fornecedor não encontrado"));

        produto.setNomeProduto(dto.nomeProduto());
        produto.setFornecedor(fornecedor);
        return produto;
    }

    public List<ProdutoResponseDTO> listar(){
        return produtoRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ProdutoResponseDTO buscarPorId(Long id){
        Produto pro = produtoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("ID do produto não encontrado"));
        return toResponse(pro);
    }

    public List<ProdutoResponseDTO> buscarPorNome(String nomeProduto){
        return produtoRepository.findByNomeProduto(nomeProduto).stream().map(this::toResponse).toList();
    }

    public ProdutoResponseDTO salvar(ProdutoRequestDTO dto){
        Produto produto = toEntity(dto);
        Produto salvo = produtoRepository.save(produto);
        return toResponse(salvo);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto){
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("ID do produto não foi encontrado"));
        produto.setNomeProduto(dto.nomeProduto());

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor())
                .orElseThrow(() -> new RecursoNaoEncontrado("ID do fornecedor não encontrado"));
        produto.setFornecedor(fornecedor);

        Produto atualizado = produtoRepository.save(produto);
        return toResponse(atualizado);
    }

    public void deletar(Long id){
        Produto pro = produtoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("ID do produto não encontrado"));
        produtoRepository.delete(pro);
    }
}