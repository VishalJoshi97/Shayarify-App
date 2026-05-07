package com.shayarify.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor//default cnstr
@AllArgsConstructor//depd Inj
@Builder//lombok
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;//automatically user_id

    private String bio;

    private String imageUrl;

}
