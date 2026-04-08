# Clinic Management System ER Diagram

## Overview

This project presents the design of an Entity Relationship Diagram (ERD) for a modern clinic management system. The goal is to model a clean and scalable database structure that supports core clinic operations such as managing doctors, patients, appointments, consultations, diagnostic tests, reports, and payments.

This system is designed specifically for a clinic environment, not a large hospital system, and focuses on clarity, correctness, and real-world workflow representation.

---

## Problem Understanding

A clinic needs to digitally manage:

* Doctors across different specialties and departments
* Patients who may visit multiple times
* Appointment booking and tracking
* Actual consultations (visits)
* Diagnostic tests prescribed during consultations
* Reports generated after tests
* Payments related to consultations

The system must clearly distinguish between booking an appointment and an actual consultation, and support multiple visits, tests, and reports.

---

## Key Design Decisions

### 1. Appointment vs Consultation

Appointments represent scheduled bookings, while consultations represent actual visits.

* One appointment may or may not result in a consultation
* Each consultation is linked to exactly one appointment

This separation reflects real-world scenarios such as cancellations or no-shows.

---

### 2. Entity Relationships Flow

The system follows a structured flow:

Patient → Appointment → Consultation → Test → Report
↓
Payment

---

### 3. Test and Report Linking

* Tests are linked to consultations, not directly to patients or doctors
* Reports are linked to tests

This avoids redundancy and ensures consistency.

---

### 4. Payment Handling

Payments are associated with consultations, since billing typically occurs after a visit.

---

## Entities and Attributes

### Doctor

Stores information about clinic doctors.

* id (PK)
* name
* email (unique)
* password
* phone_number
* profile_pic
* experience
* speciality
* department
* description
* created_at
* updated_at

---

### Patient

Stores patient information.

* id (PK)
* name
* email (unique)
* password
* phone_number
* address
* gender
* age
* created_at
* updated_at

---

### Appointment

Represents booking between a patient and a doctor.

* id (PK)
* patient_id (FK)
* doctor_id (FK)
* price
* appointment_date
* appointment_time
* status (booked, cancelled, completed, no_show)
* created_at
* updated_at

---

### Consultation

Represents an actual visit.

* id (PK)
* appointment_id (FK)
* consultation_time
* date
* notes
* created_at
* updated_at

---

### Test

Represents diagnostic tests prescribed during consultation.

* id (PK)
* consultation_id (FK)
* test_name
* test_time
* status (prescribed, completed)
* created_at

---

### Report

Represents results generated from tests.

* id (PK)
* test_id (FK)
* name
* result
* description
* media (URL)
* created_at
* updated_at

---

### Payment

Represents payment for a consultation.

* id (PK)
* consultation_id (FK)
* amount
* payment_method (cash, card, upi)
* date
* status (pending, paid, failed)

---

## Relationship Summary

* One patient can have many appointments
* One doctor can have many appointments
* One appointment belongs to one patient and one doctor
* One appointment may result in one consultation
* One consultation can have multiple tests
* One test generates one or more reports
* One consultation can have one payment

---

## Design Strengths

* Clear separation of responsibilities between entities
* No redundant foreign keys
* Real-world workflow accurately modeled
* Scalable and normalized structure
* Supports multiple visits and multiple tests per visit

---

## Assumptions

* Not all appointments lead to consultations
* Tests are always prescribed during consultations
* Reports are generated after test completion
* Payments are linked to consultations, not appointments

---

## Submission Details

* The ER diagram is provided as a single board
* All entities, attributes, primary keys, and foreign keys are clearly labeled
* Relationships are structured and readable
* The design is organized for easy evaluation

---

## Conclusion

This ERD provides a clean, scalable, and realistic representation of a clinic management system. It correctly models the lifecycle of a patient visit from appointment booking to consultation, diagnostics, reporting, and payment, while maintaining strong database design principles such as normalization and logical consistency.
