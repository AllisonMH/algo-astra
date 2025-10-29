# Deploying Algo Astra to Vercel

This guide explains how to deploy the Algo Astra app to Vercel, including both the React frontend and the standalone GraphQL server.

## Architecture Overview

Algo Astra uses a **two-server architecture**:

1. **Frontend (React + Vite)** - Static site
2. **Backend (GraphQL Server)** - Serverless API

Both can be deployed on Vercel using Vercel's serverless functions.

---

## Deployment Strategy

We'll deploy this as a **monorepo** with:
- Frontend served as a static Vite build
- GraphQL server converted to a Vercel serverless function

---

## Step 1: Prepare the Project

### 1.1 Create Vercel Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/graphql",
      "dest": "/api/graphql.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 1.2 Create Serverless GraphQL Function

Create `api/graphql.js`:

```javascript
import { buildSchema } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/http'

// In-memory storage (consider using a database for production)
let quizResults = []
let nextId = 1

const lessonData = {
  arrays: {
    id: '1',
    topic: 'arrays',
    title: 'Arrays & Lists',
    content: 'Arrays are like spacecraft hangars - they store multiple items in a sequential, indexed order.',
    spaceExample: 'Think of the International Space Station modules arranged in a line.',
    keyPoints: [
      'Fixed or dynamic size collection',
      'Zero-based indexing',
      'O(1) access time by index',
      'O(n) insertion/deletion in middle'
    ]
  },
  // ... include all other lesson data from server/schema/resolvers.js
}

const schema = buildSchema(`
  type QuizResult {
    id: ID!
    topic: String!
    score: Int!
    totalQuestions: Int!
    timestamp: String!
    isPerfectScore: Boolean!
  }

  type LessonContent {
    id: ID!
    topic: String!
    title: String!
    content: String!
    spaceExample: String!
    keyPoints: [String!]!
  }

  input QuizResultInput {
    topic: String!
    score: Int!
    totalQuestions: Int!
    isPerfectScore: Boolean!
  }

  type Query {
    quizResults: [QuizResult!]!
    lessonContent(topic: String!): LessonContent
  }

  type Mutation {
    saveQuizResult(input: QuizResultInput!): QuizResult!
  }
`)

const resolvers = {
  quizResults: () => quizResults,
  lessonContent: ({ topic }) => lessonData[topic] || null,
  saveQuizResult: ({ input }) => {
    const result = {
      id: String(nextId++),
      topic: input.topic,
      score: input.score,
      totalQuestions: input.totalQuestions,
      timestamp: new Date().toISOString(),
      isPerfectScore: input.isPerfectScore
    }
    quizResults.push(result)
    return result
  }
}

const handler = createHandler({
  schema: schema,
  rootValue: resolvers,
})

export default async function (req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    await handler(req, res)
  } catch (error) {
    console.error('GraphQL Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
```

### 1.3 Update GraphQL Client Configuration

Update `src/graphql/client.js`:

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL ||
       (import.meta.env.PROD ? '/api/graphql' : 'http://localhost:4000/graphql'),
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client
```

### 1.4 Update package.json

Add a build script that Vercel will use:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "node server/index.js"
  }
}
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional):
   - Add `VITE_GRAPHQL_URL` if you want to use a custom endpoint
   - Leave empty to use the default `/api/graphql`

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

---

## Step 3: Verify Deployment

1. **Check Frontend**:
   - Visit your Vercel URL (e.g., `https://algo-astra.vercel.app`)
   - Navigate through all tabs
   - Test interactive features

2. **Check GraphQL Endpoint**:
   - Visit `https://your-app.vercel.app/api/graphql`
   - You should see the GraphQL endpoint response

3. **Test Quiz Functionality**:
   - Take a quiz
   - Verify results are saved
   - Check quiz history

---

## Important Notes for Vercel Deployment

### 1. Data Persistence

⚠️ **The current implementation uses in-memory storage**, which means:
- Quiz results will be lost when the serverless function restarts
- Each user session may hit different function instances

**Solutions for Production**:

**Option 1: Use Vercel KV (Redis)**
```bash
npm install @vercel/kv
```

Update `api/graphql.js`:
```javascript
import { kv } from '@vercel/kv'

const resolvers = {
  quizResults: async () => {
    return await kv.get('quizResults') || []
  },
  saveQuizResult: async ({ input }) => {
    const results = await kv.get('quizResults') || []
    const result = { /* ... */ }
    results.push(result)
    await kv.set('quizResults', results)
    return result
  }
}
```

**Option 2: Use PostgreSQL/MongoDB**
- Add database connection (e.g., Supabase, MongoDB Atlas)
- Update resolvers to use database queries

**Option 3: Use Vercel Postgres**
```bash
npm install @vercel/postgres
```

### 2. Environment Variables

If using a database, add these in Vercel dashboard:
- `DATABASE_URL`
- `VITE_GRAPHQL_URL` (optional)

### 3. CORS Configuration

The serverless function already includes CORS headers:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*')
```

For production, restrict to your domain:
```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.vercel.app')
```

### 4. Cold Starts

Vercel serverless functions may have cold starts:
- First request after inactivity may be slower
- Consider using Vercel Pro for better performance
- Or keep functions warm with periodic pings

---

## Alternative: Deploy with Separate Backend

If you prefer to keep the standalone Express server:

### Option 1: Backend on Vercel, Frontend on Vercel

1. Create a separate Vercel project for the backend
2. Deploy `server/` directory as a standalone project
3. Update frontend's `VITE_GRAPHQL_URL` to point to backend URL

### Option 2: Backend on Railway/Render, Frontend on Vercel

**Deploy Backend to Railway**:
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub
4. Set start command: `node server/index.js`
5. Note the public URL

**Deploy Frontend to Vercel**:
1. Set environment variable: `VITE_GRAPHQL_URL=https://your-railway-url.railway.app/graphql`
2. Deploy normally

---

## Troubleshooting

### Build Fails
- Check Node.js version (use Node 18+)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### GraphQL Not Working
- Verify `/api/graphql` endpoint is accessible
- Check CORS settings
- Inspect Network tab in browser DevTools

### Quiz Results Not Persisting
- Implement proper database storage (see persistence section)
- Use Vercel KV or external database

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check `postcss.config.js` and `tailwind.config.js`
- Verify all CSS is imported in `src/index.css`

---

## Performance Optimization

1. **Enable Vercel Analytics**:
   ```bash
   npm install @vercel/analytics
   ```

   Update `src/main.jsx`:
   ```javascript
   import { inject } from '@vercel/analytics'
   inject()
   ```

2. **Enable Edge Functions** (Optional):
   Update `vercel.json`:
   ```json
   {
     "functions": {
       "api/graphql.js": {
         "runtime": "edge"
       }
     }
   }
   ```

3. **Optimize Images**:
   - Use Vercel Image Optimization
   - Convert to WebP format

---

## Deployment Checklist

- [ ] Create `vercel.json` configuration
- [ ] Create `api/graphql.js` serverless function
- [ ] Update GraphQL client to use `/api/graphql`
- [ ] Test locally with `vercel dev`
- [ ] Push to GitHub
- [ ] Import project to Vercel
- [ ] Configure build settings
- [ ] Set environment variables (if needed)
- [ ] Deploy and test
- [ ] Verify all features work
- [ ] Implement database for persistence (recommended)
- [ ] Set up custom domain (optional)

---

## Cost Considerations

**Vercel Free Tier Includes**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions (100GB-hours)
- ✅ Automatic HTTPS
- ✅ GitHub integration

**Upgrade if you need**:
- More bandwidth
- Better performance (Edge Functions)
- Analytics
- Password protection

---

## Next Steps After Deployment

1. **Add Database**: Implement Vercel KV or PostgreSQL for data persistence
2. **Custom Domain**: Add your own domain in Vercel settings
3. **Analytics**: Enable Vercel Analytics to track usage
4. **Monitoring**: Set up error tracking (e.g., Sentry)
5. **SEO**: Add meta tags and Open Graph images
6. **Testing**: Run tests on production environment

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GraphQL-HTTP](https://github.com/graphql/graphql-http)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)

---

**Your Algo Astra app is now ready to deploy to Vercel!** 🚀

For local testing before deployment, run:
```bash
npm run build && npm run preview
```

This simulates the production build locally.
