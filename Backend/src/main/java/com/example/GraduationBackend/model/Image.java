package com.example.GraduationBackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

import java.sql.Blob;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "images")
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
    @JsonIgnore   // ✅ تجاهل Blob عند تحويل JSON → حل مشكلة Type definition error
    @Schema(type = "string", format = "binary", description = "يرجى اختيار ملف الصورة من جهازك")
    private Blob image ;

    @Column(name = "image_url")
    private String imageUrl ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    @JsonIgnore   // ✅ منع loop مع Place
    private Place place ;
}
