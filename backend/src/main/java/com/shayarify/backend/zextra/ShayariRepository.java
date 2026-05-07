package com.shayarify.backend.zextra;

import com.shayarify.backend.model.Shayari;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShayariRepository  extends JpaRepository<Shayari,Long> {

}
