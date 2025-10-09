package com.example.GraduationBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "images")
public class Image {

    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    @Column(name = "file_name")
    private String fileName ;

    @Column(name = "file_type")
    private String fileType ;

    @Lob
    private Blob image ;

    @Column(name = "image_url")
    private String imageUrl ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place ;


}
