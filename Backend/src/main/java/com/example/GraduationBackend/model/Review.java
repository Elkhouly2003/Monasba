package com.example.GraduationBackend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @Column(name = "review_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id ;

    @Column(name = "review_message")
    private String comment ;

    @ManyToOne
    @JoinColumn(name = "user_id")
     private User user ;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place ;

    @Column(name = "place_rating")
    private  Integer ratings ;

}
