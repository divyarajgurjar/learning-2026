# Smart Elevator Control System – ERD Explanation, Evaluation Answer

---

## 1. System Explanation

### Overview
This system represents a scalable backend platform for managing intelligent elevator operations across multiple large buildings such as malls, airports, hospitals, and corporate towers.

It supports:
- Multiple buildings
- Multiple elevators per building
- Floor-level request generation
- Elevator assignment
- Ride execution tracking
- Status monitoring
- Maintenance tracking

---

### Design Philosophy

#### 1. Separation of Concerns

The system is divided into:

| Category | Tables |
|----------|--------|
| Static Structure | Building, Floor, Elevator, ElevatorShaft |
| Capability | ElevatorFloor |
| Events | FloorRequest, RideAssignment, RideLog |
| Monitoring | ElevatorStatusLog |
| Maintenance | MaintenanceLog |

This ensures clarity, scalability, and avoids mixing responsibilities.

---

#### 2. Event-Based Modeling

The system separates:

- Request → user intent
- Assignment → system decision
- RideLog → actual execution

This enables:
- historical tracking
- debugging
- analytics

---

#### 3. No Redundancy

- No repeated data
- No derived attributes stored
- Relationships used instead of duplication

---

### Core Relationships

- Building → Floor (1:M)
- Building → Elevator (1:M)
- Elevator ↔ Floor (M:N via ElevatorFloor)
- FloorRequest → RideAssignment → Elevator
- Elevator → RideLog
- Elevator → ElevatorStatusLog
- Elevator → MaintenanceLog

---


# Smart Elevator Control System – ER Diagram

## Overview

This project models a smart elevator control system designed for large infrastructure environments. It supports multiple buildings, elevators, ride requests, and operational tracking.

---

## System Design Layers

### Static Configuration
- Building
- Floor
- Elevator
- ElevatorShaft
- ElevatorFloor

### Dynamic Operations
- FloorRequest
- RideAssignment
- RideLog

### Monitoring and Maintenance
- ElevatorStatusLog
- MaintenanceLog

---

## Entity Descriptions

### Building
Stores building-level information.

### Floor
Represents floors within a building.

### ElevatorShaft
Represents physical shafts.

### Elevator
Represents elevator units.

### ElevatorFloor
Handles many-to-many relationship between elevators and floors.

---

### FloorRequest
Captures user-generated requests.

### RideAssignment
Maps requests to elevators.

### RideLog
Stores completed ride information.

---

### ElevatorStatusLog
Tracks elevator state changes over time.

### MaintenanceLog
Tracks maintenance activities and history.

---

## Features Supported

- Multi-building support
- Multiple elevators per building
- Floor request tracking
- Elevator assignment
- Ride history logging
- Status tracking
- Maintenance tracking

---

## Design Highlights

- Clean separation of static and dynamic data
- No redundancy
- Scalable architecture
- Supports analytics and monitoring

---

## 3. Evaluation Answers

### Infrastructure Understanding 

- Buildings, floors, and elevators are modeled as separate entities.
- Elevator configuration is separated from ride activity data.

---

### Entity Quality 

- Correct entities: Building, Floor, Elevator, FloorRequest, RideAssignment, MaintenanceLog.
- Requests are not merged into Elevator.

---

### Relationship Modeling 

- Building–Floor and Building–Elevator relationships are correct.
- Request-to-elevator assignment is handled via RideAssignment.
- Many-to-many between Elevator and Floor is handled via ElevatorFloor.

---

### Attribute and Table Design

- Static and dynamic data are clearly separated.
- Elevator status is tracked in ElevatorStatusLog.
- Maintenance is handled via MaintenanceLog, not inside Elevator.

---

### PK/FK and Junction Tables

- Requests are correctly linked to elevators via RideAssignment.
- ElevatorFloor correctly models floor servicing.
- RideAssignment is properly structured.

---

### Real-World Practicality

- Supports multiple buildings and elevators.
- Handles high request volumes.
- Tracks history, status, and maintenance.
- Suitable for real infrastructure systems.

---

### Diagram Neatness

- Clean structure
- Clearly defined PK/FK
- Logical relationships

---
