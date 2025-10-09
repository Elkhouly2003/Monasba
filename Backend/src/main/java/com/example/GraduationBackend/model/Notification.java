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
@Entity(name = "notifications")

public class Notification {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    @Column(name = "from_id")
    private Integer from ;

    @ManyToOne
    @JoinColumn(name = "to_id")
    private User user;

    @Column(name = "notification_message")
    private String message;

    @Column(name = "notification_action")
    private String action ;

}
