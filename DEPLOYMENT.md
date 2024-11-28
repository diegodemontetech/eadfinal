# VPJ Learning Platform - Bare Metal Deployment Guide

## 1. Initial Server Setup

```bash
# Create application directory
mkdir -p /root/vpj-learning
cd /root/vpj-learning

# Create necessary subdirectories
mkdir -p {config,data,logs,uploads}
```

## 2. PostgreSQL Installation and Setup

```bash
# Install PostgreSQL
apt update
apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
systemctl start postgresql
systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE vpj_learning;
CREATE USER vpj_admin WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE vpj_learning TO vpj_admin;
\q
```

## 3. Environment Configuration

Create `/root/vpj-learning/config/.env`:

```env
# Database Configuration
DATABASE_URL="postgresql://vpj_admin:your_secure_password@localhost:5432/vpj_learning"
JWT_SECRET="your-secure-jwt-secret"

# Server Configuration
PORT=3000
NODE_ENV=production

# File Upload Configuration
UPLOAD_DIR="/root/vpj-learning/uploads"
MAX_FILE_SIZE="50mb"

# Logging Configuration
LOG_LEVEL="info"
LOG_DIR="/root/vpj-learning/logs"
```

## 4. Application Setup

```bash
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Clone repository
cd /root/vpj-learning
git clone [repository-url] .

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy
```

## 5. Initial Data Setup

Create `/root/vpj-learning/scripts/init-data.sql`:

```sql
-- Categories
INSERT INTO "Category" (id, name, description, "isActive", "usedInCourses", "usedInEbooks")
VALUES 
  (gen_random_uuid(), 'Gestão', 'Conteúdo sobre gestão pecuária', true, true, true),
  (gen_random_uuid(), 'Nutrição', 'Conteúdo sobre nutrição animal', true, true, true),
  (gen_random_uuid(), 'Sanidade', 'Conteúdo sobre sanidade animal', true, true, true);

-- User Groups
INSERT INTO "UserGroup" (id, name, permissions)
VALUES 
  (gen_random_uuid(), 'Administradores', ARRAY['all']),
  (gen_random_uuid(), 'Instrutores', ARRAY['courses.read', 'courses.write']),
  (gen_random_uuid(), 'Alunos', ARRAY['courses.read']);

-- Initial Admin User (password: admin123)
INSERT INTO "User" (id, name, email, password, role)
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@vpj.com',
  '$2a$10$rK7yF.Zv3OHQ1xB7VXl5e.eBTX0xQKqTJ.wR.Yx0Ht/OUkM6PGNn2',
  'admin'
);
```

Apply initial data:
```bash
psql -U vpj_admin -d vpj_learning -f /root/vpj-learning/scripts/init-data.sql
```

## 6. Process Management Setup

Create `/root/vpj-learning/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'vpj-learning',
    script: 'dist/server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/root/vpj-learning/logs/err.log',
    out_file: '/root/vpj-learning/logs/out.log',
    log_file: '/root/vpj-learning/logs/combined.log',
    time: true
  }]
};
```

## 7. Build and Start Application

```bash
# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
```

## 8. Nginx Setup

Install and configure Nginx:

```bash
# Install Nginx
apt install -y nginx

# Create Nginx configuration
cat > /etc/nginx/sites-available/vpj-learning << 'EOL'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /root/vpj-learning/uploads;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    client_max_body_size 50M;
}
EOL

# Enable site configuration
ln -s /etc/nginx/sites-available/vpj-learning /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
```

## 9. SSL Configuration with Certbot

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal setup
certbot renew --dry-run
```

## 10. Backup Setup

Create `/root/vpj-learning/scripts/backup.sh`:

```bash
#!/bin/bash

# Set variables
BACKUP_DIR="/root/vpj-learning/data/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="vpj_learning"
DB_USER="vpj_admin"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql

# Uploads backup
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /root/vpj-learning/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

Setup daily backup cron job:

```bash
chmod +x /root/vpj-learning/scripts/backup.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /root/vpj-learning/scripts/backup.sh") | crontab -
```

## 11. Monitoring Setup

```bash
# Install monitoring tools
npm install -g pm2-logrotate
pm2 install pm2-prometheus-exporter

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

## 12. Security Setup

```bash
# Install and configure UFW firewall
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Secure PostgreSQL
echo "listen_addresses = 'localhost'" >> /etc/postgresql/*/main/postgresql.conf
echo "host all all 127.0.0.1/32 md5" > /etc/postgresql/*/main/pg_hba.conf
systemctl restart postgresql
```

## 13. Maintenance Commands

```bash
# View logs
tail -f /root/vpj-learning/logs/combined.log

# Monitor application
pm2 monit

# Database maintenance
sudo -u postgres psql -d vpj_learning -c "VACUUM ANALYZE;"

# Restart application
pm2 restart vpj-learning

# Update application
cd /root/vpj-learning
git pull
npm install
npm run build
pm2 restart vpj-learning
```

## 14. Directory Structure

Final directory structure:
```
/root/vpj-learning/
├── config/
│   └── .env
├── data/
│   └── backups/
├── logs/
│   ├── err.log
│   ├── out.log
│   └── combined.log
├── uploads/
├── scripts/
│   ├── init-data.sql
│   └── backup.sh
├── src/
├── dist/
├── ecosystem.config.js
└── package.json
```