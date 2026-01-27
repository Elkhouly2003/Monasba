Monasba - Event Booking and Management Platform
# Monasba - Event Booking and Management Platform

![Monasba Search Results](https://lh3.googleusercontent.com/d/1oZmsgU-VgnafCnQqAkqnO99QUjqVrpsW)
Project Overview

Monasba is an integrated digital platform designed to streamline the booking and management of events. 
By connecting organizers, venue owners, and service providers in a unified digital marketplace, 
the platform simplifies the entire lifecycle of personal and professional occasions.

Key Features

For Event Organizers and Attendees

  • Discovery: Advanced search for events, venues, and services with granular filtering.
  
  • Booking: Secure online booking process with real-time availability tracking.
  
  • AI Assistance: Natural language interaction for guidance and recommendations.

For Venue Owners and Service Providers

  • Management: Dedicated dashboards to manage listings, availability, and pricing.
  
  • Visibility: Digital channel to reach a broader audience and track customer interactions.

For Administrators

  • Moderation: Tools for reviewing, approving, or rejecting submitted content.
  
  •Quality Control: AI-assisted validation of event descriptions and images.
  
Backend Technologies Stack:

  • Spring Boot: Core framework for building production-ready applications.
  
  • Spring Security & JWT: Stateless authentication and Role-Based Access Control (RBAC).
  
  • Spring Data JPA: Database interaction and persistence using Hibernate.
  
  • MySQL: Relational database for structured data management.
  
  • Swagger (OpenAPI): Interactive API documentation and testing.

Frontend Technologies Stack:

   • React.js:Component-based UI development
   
   • Tailwind CSS:Utility-first styling for responsive design
   
   • Zustand:Lightweight state management
   
   • xios:Handling REST API communications

AI and Microservices

   • Google Gemini LLM:Powering the AI Chatbot assistant for user guidance
   
   • NVIDIA Nemotron:Vision-Language Model for automated content validation
   
   • Node.js Gateway:Handling AI service integrations and API requests

System Architecture and Design

The system follows the Clean Architecture principles and the Spring MVC pattern to ensure a clear separation of concerns:

  • Controller Layer: Manages API routing and request validation.
  
  • Service Layer: Implements core business logic and validation rules.
  
  • Repository Layer: Manages database access through the Repository Pattern.
  
  • Data Transfer Objects (DTOs): Facilitates secure data transfer between layers.

   
  
