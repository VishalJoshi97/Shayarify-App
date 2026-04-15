package com.shayarify.backend.service;

import com.shayarify.backend.model.Shayari;
import com.shayarify.backend.repository.ShayariRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShayariService {

    private  final ShayariRepository shayariRepository;

    //Entire shayari entity=>.save()
    public Shayari save(Shayari shayari){
        return shayariRepository.save(shayari);
    }

    //getAll() => .findAll()
    public List<Shayari> getAll(){
        return shayariRepository.findAll();
    }
}
