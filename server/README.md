# iTerra-GO Backend Server

Backend API server for iTerra-GO wellness application.

## Setup

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file in the `server/` directory:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
PORT=10000
```

## Running Locally

```bash
npm start
# or with auto-reload
npm run dev
```

Server will run on http://localhost:10000

## API Endpoints

### `GET /`
Health check - returns server status

### `POST /api/ai`
AI chat completions

**Request body:**
```json
{
  "prompt": "Your question here",
  "context": "Optional context information"
}
```

**Response:**
```json
{
  "text": "AI response text",
  "response": "AI response text"
}
```

## Deployment

### Render Web Service

1. Create new Web Service on Render
2. Connect to GitHub repository
3. Set root directory: `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable: `OPENAI_API_KEY`
7. Deploy!

### Environment Variables on Render
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `OPENAI_MODEL` - Model to use (default: gpt-4)
- `PORT` - Port (auto-set by Render, default: 10000)
