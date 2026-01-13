package com.example.GraduationBackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Booking")
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place ;

    @Column(name = "event_title")
    private String title ;

    @Column(name = "event_category")
    private String category ;

    @Column(name = "event_description")
    private String description ;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate ;

    @Column(name = "last_update")
    private LocalDateTime lastUpdate ;

    @Column(name = "start_date")
    private LocalDateTime startDate ;

    @Column(name = "end_date")
    private LocalDateTime endDate ;

    @Column(name = "event_capacity")
    private Integer capacity ;

    @Column(name = "event_price")
    private Double price ;

    @Column(name = "status")
    private String status  ;

}
