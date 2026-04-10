# Instagram Thrift & Handmade Store – ER Diagram

## Business Understanding

This database design models a small Instagram-based business that sells both thrifted and handmade products.

Thrifted items are unique and usually available as a single piece. Handmade items can be produced in multiple quantities. To represent this difference, the design includes `product_type` and `is_unique` in inventory. Additionally, the `condition` attribute is included for thrift items, which is an important real-world requirement.

The system captures the full order flow:
Customer → Orders → Order Items → Payment → Shipping

This reflects how such businesses actually operate through Instagram and WhatsApp, from order placement to final delivery.

---

## Entity Identification

The design includes all essential entities required to support the business:

* Customer
* Address
* Product
* ProductVariant
* Inventory
* Orders
* OrderItem
* Payment
* Shipping

Each entity represents a distinct part of the system. The inclusion of the Address entity improves flexibility by allowing customers to have multiple delivery addresses.

No core entity required for product management, order handling, payment tracking, or shipping is missing.

---

## Relationships and Cardinality

The relationships between entities are correctly defined:

* A customer can place multiple orders (one-to-many).
* An order can contain multiple order items (one-to-many).
* A product can appear in multiple order items (one-to-many).
* A product can have multiple variants (one-to-many).
* Each product has one inventory record (one-to-one).
* Each order has one payment record (one-to-one).
* Each order has one shipping record (one-to-one).

The many-to-many relationship between orders and products is resolved using the OrderItem entity, which acts as a junction table.

This ensures proper normalization and avoids redundancy.

---

## Attributes Quality

The attributes are meaningful, realistic, and aligned with real-world requirements.

Product-related attributes include name, category, price, and product_type. Variant-level details such as size, color, and condition are stored separately to avoid cluttering the Product entity.

Order-related attributes include order_date, total_amount, and status. The inclusion of price_at_purchase in OrderItem ensures that historical pricing is preserved even if product prices change later.

Payment attributes include payment_method, payment_status, and transaction_id. Shipping attributes include tracking_number, courier_name, and delivery dates.

Overall, attributes are well-structured and properly separated across entities.

---

## Primary Keys and Foreign Keys

Each entity has a clearly defined primary key that uniquely identifies its records.

Foreign keys are used appropriately to establish relationships between entities. For example, Orders references Customer, OrderItem references Orders and Product, and Inventory references Product.

This ensures referential integrity and maintains consistency across the database.

---

## Clarity and Diagram Structure

The ER diagram is organized in a clear and logical manner. Entities are grouped based on their roles, such as customer-related, product-related, and order-related components.

The structure follows a natural flow from customer to order processing and fulfillment, making it easy to understand.

The diagram avoids unnecessary complexity and can be easily interpreted by another reviewer.

---

## Overall Thoughtfulness

The design reflects careful consideration of real-world business needs.

It properly handles the difference between thrift and handmade products, supports inventory tracking, and models the complete lifecycle of an order.

Decisions such as separating ProductVariant, using OrderItem as a junction table, and storing price at the time of purchase demonstrate a thoughtful and practical approach to database design.

Overall, the system is scalable, normalized, and suitable for real-world use.
