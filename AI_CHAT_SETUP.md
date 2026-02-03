# AI Chat Setup Instructions

Your AI-powered chat assistant has been successfully integrated! 🤖

## What's Been Done

1. ✅ **Groq AI Integration** - Added API route at `/app/api/chat/route.ts`
2. ✅ **Portfolio Knowledge Base** - AI knows everything about:
   - Your background and experience
   - All 7 projects with details
   - Services you provide
   - Tech stack you use
   - Special offers (FREE demo, discounts)
   - Contact information
3. ✅ **Chat Component Updated** - Connected to AI API
4. ✅ **Environment Variable Added** - Ready for your Groq API key

## Setup Steps

### Step 1: Get Your Groq API Key

1. Go to https://console.groq.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

### Step 2: Add API Key to Environment

Open `.env.local` and replace `your_groq_api_key_here` with your actual API key:

```env
GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
# or
pnpm dev
```

## Testing the AI Chat

1. Open your website in the browser
2. Click the chat icon in the bottom-right corner
3. Try these sample questions:
   - "What services do you provide?"
   - "Tell me about your projects"
   - "How can I get a free demo?"
   - "What's your experience?"
   - "Show me your tech stack"
   - "Do you offer any discounts?"
   - "How can I contact Famim?"

## Features

### Knowledge Areas
- ✅ Personal background & experience
- ✅ All 7 portfolio projects with links
- ✅ Services (Website Dev, SaaS, RAG Models, AI Agents)
- ✅ Tech stack details
- ✅ FREE demo offer details
- ✅ Discount offers (20% for old customers, 5% for reviews)
- ✅ Contact information

### AI Behavior
- Professional and friendly tone
- Always promotes the FREE demo offer
- Provides specific project examples
- Includes contact info when relevant
- Highlights your expertise
- Encourages potential clients to hire you

## Model Details

- **Model**: Llama 3.3 70B Versatile (Groq)
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1024
- **Context**: Full conversation history maintained

## Troubleshooting

### "Groq API key not configured" error
- Make sure you added the API key to `.env.local`
- Restart your dev server after adding the key

### "Failed to get AI response" error
- Check if your API key is valid
- Verify you have credits in your Groq account
- Check console for detailed error messages

### AI gives generic responses
- This shouldn't happen! The AI has all your portfolio details
- If it does, check the API route is working correctly

## Customization

To modify the AI's behavior or knowledge, edit:
`app/api/chat/route.ts` - Update the `SYSTEM_PROMPT` constant

## Cost

Groq offers:
- FREE tier with generous limits
- Extremely fast response times
- No credit card required to start

## Need Help?

If you encounter any issues:
1. Check browser console for errors
2. Check server terminal for API errors
3. Verify your API key is correct
4. Ensure dev server was restarted after adding the key

Your AI assistant is ready to help convert visitors into clients! 🚀
