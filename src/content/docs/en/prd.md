---
title: Ntex Restful API Server PRD
summary: A single-paragraph context-problem-solution summary.
category: "Design Docs"
tags: ["PRD", "API", "Server"]
pubDate: "2024-03-23"
author: "Elton Zheng"
slug: "en/ntex-restful-api-server-prd"
---

## Background

Just enough context is necessary to frame the rest of the design doc.

### Helpful Links

[Product Requirement Doc](https://app.eraser.io/workspace/AqrJVBV1PWelnSFIaauJ)

## Problem

A description of the problem that this design doc is trying to address, the constraints, and why this problem is worth solving now.

## Design

### Overview

The directory structure of this project is as follows:

```plaintext
./src
├── components
│   ├── AlertBox
│   ├── Carousel
│   ├── LoginCarousel
│   ├── LoginForm
│   ├── Modal
│   ├── Pagination
│   ├── Table
│   └── UserInfo
├── content
│   └── docs
├── dom
├── layouts
├── pages
│   └── docs
├── request
└── store
    └── AlertStore
```

### Authentication Method

Use JWT(JSON Web Token) to authenticate users. The claims structure of the JWT follows:

```rust
pub struct Claims {
    pub token_id: String, // token ID
    pub iss: String,      // issuer
    pub sub: String,      // subject
    pub iat: usize,       // issue date
    pub exp: usize,       // expire date
}
```

- After a successful login, two tokens will be generated, each with a unique ID generated by the ULID library.
- After the tokens are generated, they will be saved in the Redis server. Each token ID will be used as the key, with the corresponding user ID as the value, along with its expiration time. The expiration time for each token is set in a `.env` file. Finally, both tokens will be stored in the user's browser's `localStorage`.
- When a user requests an API from the server, the access token will be sent in the request header.
- The server will decode the access token to extract the token ID. Then, it will look up the Redis server to obtain the user ID associated with this token ID.
- To use the user ID that we obtained in the previous step, the server will search for the user information with this ID from the database. If the user is found, their API request will be executed. However, if the user is not found, the server will deny the request.
  
Explain how this feature will be implemented. Highlight the components of your implementation, relationships between components, constraints, etc.

## Considerations

### Test plan

What are the failure scenarios you are going to cover in your testing

### Security

What new threats may be introduced?

### Documentation changes

What changes need to be made to the documentation?

## Definition of success

How do we know if this proposal was successful?
