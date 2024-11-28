# VPJ Learning Platform - Migration Guide

## Database Setup

### 1. Prerequisites
- PostgreSQL 12+ installed
- Node.js 18+ installed
- Environment variables configured

### 2. Environment Setup
Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vpj_learning"
JWT_SECRET="your-secret-key"
```

### 3. Database Migration
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/progress` - Get user's course progress
- `GET /api/users/certificates` - Get user's certificates
- `PUT /api/users/profile` - Update user profile

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/lessons` - Add lesson to course
- `POST /api/courses/:courseId/lessons/:lessonId/progress` - Update lesson progress

### Quiz
- `GET /api/quiz/lesson/:lessonId` - Get quiz by lesson ID
- `POST /api/quiz` - Create quiz
- `POST /api/quiz/:id/submit` - Submit quiz answers

### E-books
- `GET /api/ebooks` - Get all e-books
- `GET /api/ebooks/:id` - Get e-book by ID
- `POST /api/ebooks` - Create e-book
- `POST /api/ebooks/:id/progress` - Update reading progress

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news article
- `POST /api/news/:id/comments` - Add comment to news

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/stats/hours` - Get user's total study hours
- `GET /api/certificates/stats/grades` - Get user's quiz grades

## Database Schema

### Users and Authentication
- User
- UserGroup
- UserGroup relations

### Learning Content
- Course
- Lesson
- Quiz
- Category

### Progress Tracking
- CourseProgress
- LessonProgress
- Certificate

### E-books
- Ebook
- EbookProgress

### News and Interaction
- News
- Comment
- Comment replies

## Data Migration Steps

1. Categories
```sql
INSERT INTO "Category" (id, name, description, "isActive", "usedInCourses", "usedInEbooks")
VALUES 
  (gen_random_uuid(), 'Gestão', 'Conteúdo sobre gestão pecuária', true, true, true),
  (gen_random_uuid(), 'Nutrição', 'Conteúdo sobre nutrição animal', true, true, true),
  (gen_random_uuid(), 'Sanidade', 'Conteúdo sobre sanidade animal', true, true, true);
```

2. User Groups
```sql
INSERT INTO "UserGroup" (id, name, permissions)
VALUES 
  (gen_random_uuid(), 'Administradores', ARRAY['all']),
  (gen_random_uuid(), 'Instrutores', ARRAY['courses.read', 'courses.write']),
  (gen_random_uuid(), 'Alunos', ARRAY['courses.read']);
```

3. Initial Admin User
```sql
INSERT INTO "User" (id, name, email, password, role)
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@vpj.com',
  -- Password needs to be hashed using bcrypt
  '$2a$10$hashed_password',
  'admin'
);
```

## Security Considerations

1. Authentication
- All endpoints require JWT authentication
- Tokens expire after 7 days
- Passwords are hashed using bcrypt

2. Authorization
- Role-based access control
- Group-based course access
- Resource ownership validation

3. Data Validation
- Input validation using Zod schemas
- File upload restrictions
- SQL injection prevention through Prisma

## Monitoring

1. Key Metrics
- User engagement
- Course completion rates
- Quiz performance
- System performance

2. Error Tracking
- API response times
- Failed authentication attempts
- Database query performance
- File storage usage

## Backup Strategy

1. Database Backups
```bash
# Daily backup
pg_dump vpj_learning > backup_$(date +%Y%m%d).sql

# Restore from backup
psql vpj_learning < backup_20240316.sql
```

2. File Storage
- Regular backups of uploaded files
- Synchronization with backup storage
- Version control for content files

## Development Setup

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Setup database
npx prisma migrate deploy

# Start development server
npm run dev
```

## Production Deployment

1. Environment Setup
```bash
# Production environment variables
NODE_ENV=production
DATABASE_URL=postgresql://production-url
JWT_SECRET=production-secret
```

2. Build Process
```bash
# Build application
npm run build

# Start production server
npm start
```

3. SSL Configuration
- Enable HTTPS
- Configure SSL certificates
- Set up reverse proxy

## Maintenance

1. Regular Tasks
- Database optimization
- Cache clearing
- Log rotation
- Security updates

2. Monitoring
- Server health checks
- Database performance
- API response times
- Error rates

## Support

For technical support or questions:
- Email: support@vpj.com
- Documentation: [docs-url]
- Issue tracker: [issues-url]