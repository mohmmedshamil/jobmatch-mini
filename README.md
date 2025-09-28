
##  JobMatch Mini

A minimal recruitment platform with:

Backend (Django + DRF + PostgreSQL + Elasticsearch)

Mobile App (React Native + Expo + Redux Toolkit)

Dockerized setup for local development

# CI/CD using GitHub Actions + GHCR (Docker image push)

📦 Repository Structure
.
├── backend/              # Django REST API
├── mobile/               # React Native Expo app
├── docker-compose.yml    # Local backend services (DB, Elasticsearch)
├── Dockerfile            # Backend Dockerfile
├── .github/workflows/    # CI/CD pipeline (deploy.yaml)
└── README.md             # Project documentation

⚙️ Local Setup
1. Clone the repo
git clone https://github.com/your-username/jobmatch-mini.git
cd jobmatch-mini

2. Environment variables

Create a .env file in backend/:

DJANGO_SECRET_KEY=supersecret
DATABASE_URL=postgres://postgres:postgres@db:5432/jobmatch
ELASTICSEARCH_HOST=http://elasticsearch:9200
DEBUG=True


For mobile app, create mobile/.env:

API_URL=http://localhost:8000/api

3. Run with Docker Compose
docker-compose up --build


Services started:

Backend API → http://localhost:8000

Postgres → port 5432

Elasticsearch → http://localhost:9200

4. Run Mobile App
cd mobile
npm install
npx expo start

5. Run Backend App
   cd backend
   python3 manage.py runserver 0.0.0.0:8000

📡 API Endpoints
Authentication
POST /auth/register/
POST /auth/login/
POST /auth/logout/

Jobs
GET    /api/jobs/              # List jobs
POST   /api/jobs/              # Create job (admin only)
GET    /api/jobs/{id}/         # Retrieve job
PUT    /api/jobs/{id}/         # Update job (admin only)
DELETE /api/jobs/{id}/         # Delete job (admin only)


Example response:

{
  "id": 1,
  "title": "Software Engineer",
  "company": "TechCorp",
  "location": "Bangalore",
  "description": "Build scalable apps",
  "employment_type": "FT"
}

Applications
POST /api/jobs/{id}/apply/     # Apply to a job (candidate)
GET  /api/my-applications/     # List my applications

🔍 Elasticsearch
Index Mapping
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "company": { "type": "text" },
      "location": { "type": "keyword" },
      "description": { "type": "text" },
      "employment_type": { "type": "keyword" }
    }
  }
}

Sync Strategy

On job create/update/delete, Django signals push changes to Elasticsearch.

For full reindex:

python manage.py search_index --rebuild

🚀 CI/CD

We use GitHub Actions with GHCR (GitHub Container Registry).

Workflow: .github/workflows/deploy.yaml

Steps:

Build Docker image from Dockerfile

Push to ghcr.io/<owner>/<repo>:tag

Deploy on server (self-hosted runner pulls latest image)

Trigger

On push to main → builds :latest

On tagged release (v*) → builds :vX.Y.Z

## database connection
# Switch to postgres user
sudo -i -u postgres
psql

# Create database
CREATE DATABASE jobfinderdb;

# from docker
docker exec -it jobmatch_postgres psql -U postgres
CREATE DATABASE jobfinderdb;

# make user as admin user
python manage.py shell
from django.contrib.auth import get_user_model

User = get_user_model()
user = User.objects.get(email="Shamilshamzshz000@gmail.com")  # or use username
user.is_staff = True       # Staff user
user.is_superuser = True   # Superuser
user.save()
