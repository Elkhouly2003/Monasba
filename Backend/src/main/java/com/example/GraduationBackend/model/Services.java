package com.example.GraduationBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Services")
@Table(name = "services")

public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private long id;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "service_description")
    private String description;

    @Column(name = "service_price")
    private Double price;

    @Column(name = "service_category")
    String ServiceCategory;

    @ManyToOne
    @JoinColumn(name = "service_provider_id")
    private ServiceProviders serviceProviders;

}
