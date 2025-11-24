---
id:     api-guide-intro
title:  API Guide
---

# Football API Guide
While the full API schema offers comprehensive details on every object and relation within the graph, its complexity can make it challenging to navigate as a starting point. If you need to have a complex overview, the **Full API schema** you can find [here](http://football-api-cds-football-dev.okubeapi1.kube.lsoffice.cz/voyager).

This guide is designed to provide a **business-oriented perspective** on the API. It serves as a structured introduction to the domain, focusing on context rather than just technical definitions.

Use this guide to understand:
* **Data Scope:** Which data sets are available for specific entities and the business context in which they are populated.
* **Object Distinctions:** The semantic and functional differences between similar domain objects to ensure their correct usage.
* **Business Logic & Behavior:** The underlying domain rules that dictate how data is calculated, the specific conditions required for data generation, and how to correctly interpret value states.

## API Objects
The Football API is designed as a graph of interconnected objects. This structure allows for modularity, meaning the same object can be reused and referenced across multiple different contexts

The API schema distinguishes between two primary categories of objects:

 * **Common objects** (Shared Objects), which represent reusable, generic data structures utilized across multiple domain objects.

 * **Business objects** (Domain-Specific Objects), which model the real-world football concepts for which the API provides data.

 