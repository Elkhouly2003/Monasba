package com.example.GraduationBackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
@Table(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(name = "user_name")
    private String username;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_phone")
    private String phone;

    @Column(name = "user_role")
    private String role;    // user   owner(user+ addPlace) + admin

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image ;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL ,orphanRemoval = true )
    private List<Booking> bookings = new ArrayList<>() ;

      @ManyToMany
      @JoinTable(
              name = "user_saved_places" ,
              joinColumns = @JoinColumn(name = "user_id") ,
              inverseJoinColumns = @JoinColumn(name = "place_id")
      )
      private List<Place>savedPlaces = new ArrayList<>() ;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>() ;

    @OneToMany(mappedBy = "user" ,cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>() ;

    @Column(name = "total_revenue")
    private Double totalRevenue ;

    @OneToMany(mappedBy = "owner",fetch = FetchType.EAGER,cascade = CascadeType.ALL ,orphanRemoval = true)
    private List<Place> myPlaces ;

}
