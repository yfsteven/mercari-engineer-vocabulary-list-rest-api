# Mercari Engineer Vocabulary REST API

A REST API service for managing Japanese-English vocabulary words for engineers. This API allows users to create, read, update, and delete vocabulary entries, with support for searching by Japanese terms.

## Technologies

- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB
- **Deployment**: Deployed on Fly.io

## API Endpoints

The API is hosted at: https://mercari-jpn-api.fly.dev/

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all vocabulary words |
| GET | `/api/words` | Get all vocabulary words |
| GET | `/api/words/:id` | Get a specific word by ID |
| POST | `/api/words` | Create a new vocabulary entry |
| PUT | `/api/words/:id` | Update an existing vocabulary entry |
| DELETE | `/api/words/:id` | Delete a vocabulary entry |
| GET | `/api/words/japanese/:nihongo` | Find words by Japanese term |

## Data Model

Each vocabulary entry contains:

- `日本語` (Japanese): The word in Japanese
- `English`: The English translation
- `例文` (reibun): Example sentence in Japanese
- `example`: Example sentence in English
