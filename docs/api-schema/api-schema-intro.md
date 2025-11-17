---
id:     api-schema-intro
title:  API Schema
---

# Football API Schema
The **Full API schema** you can find [here](http://football-api-cds-football-dev.okubeapi1.kube.lsoffice.cz/voyager).

While the primary advantage of the full API schema is its completeness—detailing every object and relation within the graph—this very quality is also its main drawback. The full schema is a bit heavy to navigate and understand, which is why we explicitly describe the main common and business objects in our documentation to provide a simpler entry point."

## API Objects
The API consists of objects that are related in a graph.

The API schema distinguishes between two primary categories of objects:

 * **Common objects** (Shared Objects), which represent reusable, generic data structures utilized across multiple domain objects.

 * **Business objects** (Domain-Specific Objects), which model the real-world football concepts for which the API provides data.

 