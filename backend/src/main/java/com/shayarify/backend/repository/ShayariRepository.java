package com.shayarify.backend.repository;

import com.shayarify.backend.model.Shayari;
import com.shayarify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShayariRepository  extends JpaRepository<Shayari,Long> {

}
