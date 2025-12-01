package com.example.GraduationBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ServiceProviders")
@Table(name = "service_providers")
public class ServiceProviders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id")
    private long id;

    @Column(name ="provider_name")
    private String name;

    @Column(name = "provider_description")
    private String description;

    @Column(name = "provider_phone")
    private String phoneNumber;

    @Column(name = "provider_email")
    private String email ;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "provider_image_id")
    private Image image;

    @OneToMany(cascade = CascadeType.ALL ,orphanRemoval = true ,mappedBy = "serviceProviders")
    private List<Services> Services  ;


}
