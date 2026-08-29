package com.hackathon.golinhowms.controller;

import com.hackathon.golinhowms.dto.EntradaRequestDTO;
import com.hackathon.golinhowms.dto.EntradaResponseDTO;
import com.hackathon.golinhowms.service.EntradaService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entrada")
public class EntradaController {
    private final EntradaService service;

    public EntradaController(EntradaService service) {
        this.service = service;
    }

    @GetMapping
    public List<EntradaResponseDTO> listar(){
        return service.listar();
    }
    @GetMapping("/{id}")
    public EntradaResponseDTO buscarPorId(@Valid @PathVariable Long id){
        return service.buscarId(id);
    }

    @PostMapping
    public EntradaResponseDTO cadastrar(@Valid @RequestBody EntradaRequestDTO dto){
        return service.salvar(dto);
    }
    @PutMapping("/{id}")
    public EntradaResponseDTO cadastrar(@Valid @PathVariable Long id , @Valid @RequestBody EntradaRequestDTO dto){
        return service.atualizar(id, dto);
    }

}
