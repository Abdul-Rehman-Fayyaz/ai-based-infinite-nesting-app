# JSON Server Auth Setup

## Installation

\`\`\`bash
npm install -g json-server-auth
\`\`\`

## Database Setup

Create a \`db.json\` file in your project root:

\`\`\`json
{
  "users": [],
  "sections": []
}
\`\`\`

## Start the Server

\`\`\`bash
json-server-auth db.json --port 3001
\`\`\`

## API Endpoints

### Authentication
- POST /register - Create new user
- POST /login - Login user
- GET /users - Get all users (protected)

### Sections
- GET /sections - Get all sections
- POST /sections - Create section
- PUT /sections/:id - Update section
- DELETE /sections/:id - Delete section

## Example API Calls

### Register
\`\`\`javascript
fetch('http://localhost:3001/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password',
    name: 'John Doe'
  })
})
\`\`\`

### Login
\`\`\`javascript
fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
})
\`\`\`

### Protected Requests
\`\`\`javascript
fetch('http://localhost:3001/sections', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
})
\`\`\`
\`\`\`
