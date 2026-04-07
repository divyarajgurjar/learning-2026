# Fitness Coaching Platform – ER Diagram

## Overview

This project models an online fitness coaching platform where trainers (influencers) manage clients, sell fitness plans, conduct consultations, track progress, and maintain regular check-ins.

The system is designed to reflect real-world coaching workflows:

* Some clients only attend consultations
* Some subscribe to long-term coaching plans
* Some follow routines independently without live sessions

---

## Core Design Philosophy

The database is structured around three core concepts:

* **Session** = Consultation or interaction between trainer and client
* **Check-in** = Client-submitted data (what actually happened)
* **Progress** = Trainer’s analysis and feedback

This separation ensures clarity, avoids data duplication, and supports multiple usage scenarios.

---

## Entities

### Client

Stores personal and contact details of users receiving coaching.

### Trainer

Represents coaches or influencers who manage clients and create plans.

---

## Measurements

### Client Measurement

Stores body metrics such as weight, height, and other measurements over time.
Used for tracking physical progress independently of client profile data.

### Trainer Measurement

Stores trainer’s own body statistics (optional and informational).

---

## Plans and Subscriptions

### Fitness Plan

Created by a trainer and represents a coaching program.

Attributes include:

* Plan type (free, one-time, long-term)
* Training mode (online, offline, hybrid)
* Pricing and description

**Relationship:**

* One trainer can create many plans

---

### Subscription

Links a client to a fitness plan and tracks lifecycle.

Attributes include:

* Start date and end date
* Status (active, expired, cancelled)

**Relationships:**

* One client can have multiple subscriptions
* One plan can have multiple clients

This supports:

* Multiple clients enrolling in the same plan
* A client purchasing multiple plans over time

---

## Payment

### Payment

Stores transaction details related to subscriptions.

Attributes include:

* Amount
* Status (pending, success, failed)
* Payment method
* Timestamp

**Relationship:**

* One subscription can have multiple payments

---

## Training Content

### Exercise

Represents a general exercise library.

### Personalized Exercise

Exercises assigned by a trainer to a specific client.

**Relationships:**

* Linked to client, trainer, exercise, and optionally session

---

### Diet

Represents general diet plans.

### Personalized Diet

Diet plans assigned to a client by a trainer.

**Relationships:**

* Similar to personalized exercises

---

## Session (Consultation)

Represents scheduled interaction between trainer and client.

Examples:

* Video consultations
* Coaching calls
* Form correction sessions

**Relationships:**

* One client can have many sessions
* One trainer can handle many sessions

---

## Check-in (Client Reporting)

Represents updates submitted by clients, such as:

* Workout completion
* Diet adherence
* Notes and remarks

**Relationship:**

* One client can create multiple check-ins

---

## Progress (Trainer Feedback)

Represents trainer’s analysis of client check-ins.

**Key Design Decision:**

* Progress is linked to Check-in instead of directly to Client

Attributes include:

* Trainer notes
* Feedback
* Optional session reference

**Relationships:**

* One check-in leads to one progress entry
* One trainer can create multiple progress entries
* Session link is optional

This allows:

* Feedback with or without a session
* Accurate mapping between data and analysis

---

## Relationship Summary

* Trainer (1) → (M) Fitness Plan

* Client (1) → (M) Subscription

* Fitness Plan (1) → (M) Subscription

* Subscription (1) → (M) Payment

* Client (1) → (M) Session

* Trainer (1) → (M) Session

* Client (1) → (M) Check-in

* Check-in (1) → (1) Progress

* Trainer (1) → (M) Progress

* Session (optional) → Progress

* Client (1) → (M) Personalized Exercise

* Client (1) → (M) Personalized Diet

---

## Requirements Coverage

This design supports:

* Identifying trainers and clients
* Managing fitness plans and coaching programs
* Tracking which client purchased which plan
* Managing plan start and end dates
* Scheduling sessions and consultations
* Supporting clients without sessions
* Tracking weekly check-ins
* Recording trainer feedback and progress
* Allowing multiple clients per plan
* Allowing multiple plans per client
* Managing payments and subscriptions

---

## Design Strengths

* Clear separation of concerns between interaction, data, and analysis
* Flexible for both guided coaching and self-paced users
* Avoids redundancy and ensures normalization
* Reflects real-world coaching workflows
* Scalable and maintainable

---

## Conclusion

This ER diagram models a modern online fitness coaching ecosystem rather than a traditional gym system. It supports a wide range of user behaviors while maintaining a clean and practical database structure suitable for real-world implementation.
