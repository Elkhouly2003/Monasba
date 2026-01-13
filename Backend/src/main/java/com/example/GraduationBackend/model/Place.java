package com.example.GraduationBackend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity(name = "Place")
@Table(name = "places")
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

    @Column(name = "place_short_description")
    private String shortDescription;

    @Column(name = "place_capacity")
    private Integer capacity;

    @Column(name = "open_time")
    private LocalTime openTime;

    @Column(name = "close_time")
    private LocalTime closeTime;

    @Column(name = "is_certified")
    private Boolean certified;          // by default false admin is responsible for this

    @Column(name = "place_price")
    private Double price;

    @Column(name = "place_discount")
    private Double discount;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlaceCategory> placeCategories = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)

    private List<Image> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    @JsonBackReference
    private User owner;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();

    @ManyToMany(mappedBy = "savedPlaces")
    private List<User> savedByUsers = new ArrayList<>();

}
