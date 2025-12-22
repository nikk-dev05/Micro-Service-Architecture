#  Microservices E-Commerce Backend (API Gateway + RabbitMQ)

A **Node.js microservices-based backend system** implementing **API Gateway**, **JWT authentication**, and **event-driven architecture using RabbitMQ**.  
This project demonstrates real-world backend architecture used in scalable systems.

---

##  Services Overview

| Service | Responsibility |
|-------|----------------|
| **API Gateway** | Single entry point for client requests |
| **Auth Service** | User authentication & JWT handling |
| **Product Service** | Product CRUD & stock management |
| **Order Service** | Order creation & order history |
| **RabbitMQ (Event Broker)** | Async service-to-service communication |
| **MongoDB** | Database for each service (isolated per service) |

---

##  Microservices Architecture Diagram

```text
                   ┌──────────────┐
                   │   Client     │
                   │ (Postman/UI) │
                   └──────┬───────┘
                          │
                          ▼
                ┌──────────────────┐
                │   API Gateway     │  (Port 3000)
                └──────┬─────┬──────┘
                       │     │
           ┌───────────▼─┐ ┌─▼────────────┐
           │ Auth Service │ │ Product Service  │
           │   (JWT)      │ │ (Products)   │
           │  Port 3001   │ │ Port 3002    │
           └──────────────┘ └──────┬───────┘
                                   │
                                   │ (Stock Update Event)
                                   ▼
                         ┌──────────────────┐
                         │   RabbitMQ       │
                         │  (Event Broker) │
                         └──────┬──────────┘
                                │
                                ▼
                      ┌──────────────────┐
                      │  Order Service   │
                      │   Port 3003      │
                      └──────────────────┘

```

## How the System Works
| Authentication Flow

| Client sends request to API Gateway

| API Gateway forwards request to Auth Service

| Auth Service returns JWT

| JWT is forwarded by API Gateway to other services

## Order Creation Flow (Event-Driven)

| Client calls Create Order API

| API Gateway → Order Service

| Order Service:

| Saves order in database

| Publishes event to RabbitMQ

| Product Service:

| Consumes event from RabbitMQ

| Reduces product stock asynchronously

➡ No direct HTTP call between Order & Product services
➡ Loose coupling and better scalability

## Why RabbitMQ (Event Broker)?

| Decouples services

| Asynchronous communication

| Better fault tolerance

| Industry-standard event-driven pattern

| Services don’t block or depend on each other

## Why API Gateway?

| Single entry point for client

| Centralized authentication (JWT)

| Request routing

| Hides internal microservices from client

## Tech Stack

| Backend: Node.js, Express.js

| Database: MongoDB

| Message Broker: RabbitMQ

| Authentication: JWT

| Architecture: Microservices + Event-Driven

| Testing: Postman

## Project Structure
Micro_Services/
│
├── API_Gateway/
├── Auth/
├── Product/
│   ├── Productcontroller/
│   │   └── consumer.js
│   └── rabbitmq.js
├── Order/
│   └── rabbitmq.js
└── README.md

## How to run locally
# Start RabbitMQ
docker run -it --rm -p 5672:5672 -p 15672:15672 rabbitmq:management

# Start each service
npm install
npm start

## Testing 
| Use Postman
| Call only API Gateway (port 3000)
| Services communicate internally via RabbitMQ

## Key Learnings
| API Gateway pattern
| Event-driven microservices
| RabbitMQ producer & consumer
| JWT propagation across services
| Service isolation and scalability

## Author
Nikhil
Backend Developer | Node.js | Microservices | System Design
