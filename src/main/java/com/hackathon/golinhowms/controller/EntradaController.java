package com.hackathon.golinhowms.controller;

import com.hackathon.golinhowms.dto.EntradaRequestDTO;
import com.hackathon.golinhowms.dto.EntradaResponseDTO;
import com.hackathon.golinhowms.repository.EntradaRepository;
import com.hackathon.golinhowms.service.EntradaService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/entrada")
public class EntradaController {
    private final EntradaService service;
    private final EntradaRepository entradaRepository;

    public EntradaController(EntradaService service, EntradaRepository entradaRepository) {
        this.service = service;
        this.entradaRepository = entradaRepository;
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
    @GetMapping("/periodo")
    public List<EntradaResponseDTO> listarPorPeriodo(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime de,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime ate
    ) {
        return service.listarPorPeriodo(de, ate);
    }
}
