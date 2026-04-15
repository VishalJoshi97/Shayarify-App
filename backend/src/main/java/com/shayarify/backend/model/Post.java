package com.shayarify.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor//default cnstr
@AllArgsConstructor//depd Inj
@Builder//lombok
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT") // 🔥 IMPORTANT
    private String content;

    @ManyToOne
    private User user;
}
