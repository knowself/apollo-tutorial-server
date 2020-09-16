# Apollo SpaceX Graphql Tutorial Server maintained by Joe Terry

There is the web client which comes with the tutorial and a Flutter client in development.

This is a statndard tutorial of an Apollo Powered (https://www.apollographql.com/) implementation of GraphQL, an open source specification, for building powerful retrival and storage models of any data sourced from anywhere.

This GraphQL Server can be hosted on Heroku and backed by the Postgresql database (https://www.postgresql.org/), the most advanced open source relational database.

This same server with NO CHANGES can be run locally on a desktop computer in which case it is backed by the SQLite file-based database which powers every mobile phone from Apple's IOS and Android's Android.

Managing data in modern applications is challenging. Most applications require:

Distinct front-end clients for multiple platforms (web, iOS, etc.), each with different data requirements
A backend that serves data to clients from multiple sources (Postgres, Redis, etc.)
Complex state and cache management for both the frontend and the backend
By adopting GraphQL and Apollo, you can reduce these challenges considerably. GraphQL's declarative model helps you create a consistent, predictable API you can use across all of your clients. As you add, remove, and migrate back-end data stores, that API doesn't change from the client's perspective.

Even with many other advantages, GraphQL's single greatest benefit is the developer experience it provides. It's straightforward to add new types and fields to your API, and similarly straightforward for your clients to begin using those fields. This helps you design, develop, and deploy features quickly.
