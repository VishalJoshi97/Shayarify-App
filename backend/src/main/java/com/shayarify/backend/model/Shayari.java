package com.shayarify.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor//default cnstr
@AllArgsConstructor//depd Inj
@Builder//lombok
public class Shayari {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String language;

    private String category;

    //foreign key column
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
