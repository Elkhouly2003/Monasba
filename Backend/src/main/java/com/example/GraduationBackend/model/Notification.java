package com.example.GraduationBackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    @Column(name = "user_id")
    private Integer userId ;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User placeOwner;

    @Column(name = "notification_message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place ;

    @Column(name = "notification_action")
    private String action ;

}
