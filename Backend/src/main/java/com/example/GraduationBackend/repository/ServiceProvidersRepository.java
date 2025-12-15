package com.example.GraduationBackend.repository;

import com.example.GraduationBackend.model.ServiceProviders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceProvidersRepository extends JpaRepository<ServiceProviders, Integer> {
}
