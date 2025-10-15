## Experiences API

A simple REST API to manage labor experiences. Built with Node.js and Express.

---

Table of Contents

- Features
- Requirements
- Installation
- Running the API
- API Endpoints
- Example Requests
- Notes

---

Features

- Retrieve all experiences
- Retrieve a single experience by ID
- Create a new experience
- Update an existing experience
- Delete an experience

---

Requirements

- Node.js >= 18.x
- npm >= 9.x

---

Installation

1. Clone the repository:

git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies:

npm install

---

Running the API

Start the API server with nodemon (auto-reloads on changes):

npm run api

By default, the API runs on:

http://localhost:3001

---

API Endpoints

Method | Endpoint | Description
-------|---------|------------
GET    | /experiences | Get all experiences
GET    | /experiences/:id | Get experience by ID
POST   | /experiences | Create a new experience
PATCH  | /experiences/:id | Update an experience
DELETE | /experiences/:id | Delete an experience

---

Experience Object

Each experience has the following fields:

{  
  "id": 1,  
  "company": "Lettuce Financial Labs",  
  "role": "Automation Engineer",  
  "startDate": "July 2025",  
  "endDate": null,  
  "description": "Creating and designing automation workflows",
  "tech": ["Node.js", "Stagehand", "Playwright"],  
  "highlights": ["Implemented email verification automation", "Integrated LLM reasoning in gray areas"]  
}

- id: number, unique identifier
- company: string, company or organization name
- role: string, job title or role
- startDate: string, start date (e.g., "July 2025")
- endDate: string or null, end date or null if current
- description: string, role description
- tech: array of strings, technologies used
- highlights: array of strings, key achievements

---

Example Requests (using curl)

Get all experiences:

curl http://localhost:3001/experiences

Get a single experience by ID:

curl http://localhost:3001/experiences/1

Create a new experience:

curl -X POST http://localhost:3001/experiences \
-H "Content-Type: application/json" \
-d '{
  "company": "TEDx University",
  "role": "Head of Budgeting and Sponsorship",
  "startDate": "August 2022",
  "endDate": "June 2023",
  "description": "Oversaw budgeting and sponsorship acquisition",
  "tech": ["Google Sheets", "Slack"],
  "highlights": ["Secured partnerships", "Led a team of 4"]
}'

Update an experience:

curl -X PATCH http://localhost:3001/experiences/1 \
-H "Content-Type: application/json" \
-d '{"role": "Senior Automation Engineer"}'

Delete an experience:

curl -X DELETE http://localhost:3001/experiences/2

---

Notes

- The API uses an in-memory database, so all changes are lost when the server stops.
- CORS is enabled, so you can call it from a frontend running on a different port (e.g., Angular app on localhost:4200).
- Use nodemon during development for automatic reloads.
