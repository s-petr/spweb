# AI Text Formatter Serverless Function

Serverless function designed to be deployed to Cloudflare workers

## Environment Variables

- INPUT_MAX_KILOBYTES (max input text limit, default 50KB)
- AI_PROVIDER_PLATFORM (example "Google", "OpenAI")
- AI_PROVIDER_URL (example "https://generativelanguage.googleapis.com/v1beta/models")
- AI_PROVIDER_MODEL (example "gemini-2.5-flash-lite")
- AI_PROVIDER_API_KEY

## Testing

Use [test.txt](test.txt) to test AI text formatting