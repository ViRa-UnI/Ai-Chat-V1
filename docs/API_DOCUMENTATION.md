# API Documentation

## Overview

This document outlines the API endpoints provided by the AI Chat Assistant Web Application. The application leverages the MERN stack and integrates with the OpenAI API to deliver conversational AI capabilities.

## Authentication

### Register

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**: `201 Created`
- **Error Response**: `400 Bad Request`

### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `401 Unauthorized`

## Chat

### Send Message

- **URL**: `/api/chat/message`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "message": "string"
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `400 Bad Request`

### Fetch Chat History

- **URL**: `/api/chat/history`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response**: `200 OK`
- **Error Response**: `404 Not Found`

## Settings

### Update Settings

- **URL**: `/api/settings/update`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "theme": "string",
    "fontSize": "string",
    "aiResponseBehavior": "string"
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `400 Bad Request`

## Errors

The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the `2xx` range indicate success, codes in the `4xx` range indicate an error that resulted from the provided information, and codes in the `5xx` range indicate an error with our servers.

## Security

All API endpoints are secured with JWT-based authentication. Ensure that you are sending a valid JWT token in the `Authorization` header as a Bearer token for all requests that require authentication.

## Rate Limits

The API enforces rate limits to prevent abuse and ensure service availability. If you exceed these limits, you will receive a `429 Too Many Requests` response. Contact support for higher limits if necessary.

## Appendix

- **OpenAI API Documentation**: [OpenAI API Docs](https://beta.openai.com/docs/)
- **MERN Stack Tutorials**: [MERN Stack Resources](https://www.mongodb.com/mern-stack)
- **Security Best Practices**: [Web Security Guidelines](https://owasp.org/www-project-top-ten/)