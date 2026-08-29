package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.ProdutoRequestDTO;
import com.hackathon.golinhowms.dto.ProdutoResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Fornecedor;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.FornecedorRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.data.repository.core.support.RepositoryMethodInvocationListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final FornecedorRepository fornecedorRepository;
    private final RepositoryMethodInvocationListener repositoryMethodInvocationListener;

    public ProdutoService(ProdutoRepository produtoRepository, FornecedorRepository fornecedorRepository, RepositoryMethodInvocationListener repositoryMethodInvocationListener){
        this.produtoRepository = produtoRepository;
        this.fornecedorRepository = fornecedorRepository;
        this.repositoryMethodInvocationListener = repositoryMethodInvocationListener;
    }

    private ProdutoResponseDTO toResponse(Produto produto){

        return new ProdutoResponseDTO(
                produto.getIdProduto(),
                produto.getNome(),
                produto.getFornecedor().getIdFornecedor(),
                produto.getFornecedor().getNomeFantasma()
        );
    }

    private Produto toEntity(ProdutoRequestDTO dto){
        Produto produto = new Produto();

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor()).orElseThrow(() -> new RecursoNaoEncontrado(""));

        produto.setNome(dto.nomeProduto());
        produto.setFornecedor(fornecedor);
        return produto;
    }

    public List<ProdutoResponseDTO> listar(){
        return produtoRepository.findAll().stream().map(this::toResponse).toList();
    }

    public ProdutoResponseDTO buscarPorId(Long id){
        Produto pro = produtoRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID do produto nao encontrado"));
        return toResponse(pro);
    }

    public List<ProdutoResponseDTO> buscarPorNome(String nome){
        List<ProdutoResponseDTO> pro = produtoRepository.findByNome(nome).stream().map(this::toResponse).toList();
        return pro;
    }

    public ProdutoResponseDTO salvar(ProdutoRequestDTO dto){
        Produto produto = toEntity(dto);
        Produto salvo = produtoRepository.save(produto);
        return toResponse(salvo);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto){
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID do produto nao foi encontrado"));
        produto.setNome(dto.nomeProduto());

        Fornecedor fornecedor = fornecedorRepository.findById(dto.idFornecedor()).orElseThrow(() -> new RecursoNaoEncontrado("ID do fornecedor nao encontrado"));
        produto.setFornecedor(fornecedor);
        return toResponse(produto);
    }

    public void deletar(Long id){
        Produto pro = produtoRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID do produto nao encontrado"));
        produtoRepository.delete(pro);
    }
}
