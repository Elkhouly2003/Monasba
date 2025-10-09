package com.example.GraduationBackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity(name = "places")
public class Place {

    @Id
    @Column(name = "place_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer placeId;

    @Column(name = "place_name")
    private String placeName;

    @Column(name = "place_address")
    private String address;

    @Column(name = "place_city")
    private String city;

    @Column(name = "place_country")
    private String country;

    @Column(name = "place_phone")
    private String phone;

    @Column(name = "place_description")
    private String description;

    @Column(name = "place_capacity")
    private Integer capacity ;

    @Column(name = "start_time")
    private LocalDateTime startDateTime ;

    @Column(name = "end_time")
    private LocalDateTime endDateTime ;

    @OneToMany(mappedBy = "place" ,cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<Review> reviews = new ArrayList<Review>();

    @Column(name = "is_certified")
    private Boolean certified ;          // by default false admin is responsible for this

    @Column(name = "place_price")
    private Double price ;

    @Column(name = "place_discount")
    private Double discount ;

    @ElementCollection
    @CollectionTable(
            name = "place_categories",
            joinColumns = @JoinColumn(name = "place_id")
    )
    @Column(name = "category_name")
    private List<String> categories = new ArrayList<>();

    @Column(name = "has_ticket")
    private Boolean hasTicket ;


   @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.EAGER ,orphanRemoval = true)
   private List<Image> images = new ArrayList<>();

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "owner_id")
   private User owner ;

   @OneToMany(mappedBy = "place" , cascade = CascadeType.ALL ,orphanRemoval = true)
   private List<Booking> events = new ArrayList<>();


}
