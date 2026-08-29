package com.hackathon.golinhowms.service;

import com.hackathon.golinhowms.dto.PrateleiraRequestDTO;
import com.hackathon.golinhowms.dto.PrateleiraResponseDTO;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.exception.RecursoNaoEncontrado;
import com.hackathon.golinhowms.model.Prateleira;
import com.hackathon.golinhowms.model.Produto;
import com.hackathon.golinhowms.repository.PrateleiraRepository;
import com.hackathon.golinhowms.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrateleiraService {
    private final PrateleiraRepository prateleiraRepository;
    private final ProdutoRepository produtoRepository;

    public PrateleiraService(PrateleiraRepository prateleiraRepository, ProdutoRepository produtoRepository) {
        this.prateleiraRepository = prateleiraRepository;
        this.produtoRepository = produtoRepository;
    }

    private PrateleiraResponseDTO toResponse(Prateleira prateleira) {
        return new PrateleiraResponseDTO(
                prateleira.getIdPrateleira(),
                prateleira.getAndar(),
                prateleira.getColuna(),
                prateleira.getCorredor(),
                prateleira.getQuantidade(),
                prateleira.getProduto().getIdProduto(),
                prateleira.getProduto().getNomeProduto()
        );
    }

    public List<PrateleiraResponseDTO> listar() {
        return prateleiraRepository.findAll().stream().map(this::toResponse).toList();
    }

    public PrateleiraResponseDTO buscarPorId(Long id) {
        Prateleira prateleira = prateleiraRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("Prateleira não encontrada"));
        return toResponse(prateleira);
    }

    public PrateleiraResponseDTO salvar(PrateleiraRequestDTO dto) {
        validarPosicaoLivre(dto.andar(), dto.coluna(), dto.corredor(), null);

        Produto produto = produtoRepository.findById(dto.idProduto())
                .orElseThrow(() -> new RecursoNaoEncontrado("Produto não encontrado"));

        Prateleira prateleira = new Prateleira();
        prateleira.setAndar(dto.andar());
        prateleira.setColuna(dto.coluna());
        prateleira.setCorredor(dto.corredor());
        prateleira.setQuantidade(dto.quantidade());
        prateleira.setProduto(produto);

        Prateleira salva = prateleiraRepository.save(prateleira);
        return toResponse(salva);
    }

    public PrateleiraResponseDTO atualizar(Long id, PrateleiraRequestDTO dto) {
        Prateleira prateleira = prateleiraRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("Prateleira não encontrada"));

        validarPosicaoLivre(dto.andar(), dto.coluna(), dto.corredor(), id);

        Produto produto = produtoRepository.findById(dto.idProduto())
                .orElseThrow(() -> new RecursoNaoEncontrado("Produto não encontrado"));

        prateleira.setAndar(dto.andar());
        prateleira.setColuna(dto.coluna());
        prateleira.setCorredor(dto.corredor());
        prateleira.setQuantidade(dto.quantidade());
        prateleira.setProduto(produto);

        Prateleira atualizada = prateleiraRepository.save(prateleira);
        return toResponse(atualizada);
    }

    public void deletar(Long id) {
        Prateleira prateleira = prateleiraRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontrado("Prateleira não encontrada"));
        prateleiraRepository.delete(prateleira);
    }

    private void validarPosicaoLivre(Integer andar, Integer coluna, Integer corredor, Long idIgnorar) {
        prateleiraRepository.findByAndarAndColunaAndCorredor(andar, coluna, corredor)
                .filter(p -> idIgnorar == null || !p.getIdPrateleira().equals(idIgnorar))
                .ifPresent(p -> {
                    throw new RecursoNaoEncontrado(
                            "Já existe um produto nessa posição (andar %d, coluna %d, corredor %d)"
                                    .formatted(andar, coluna, corredor));
                });
    }
}