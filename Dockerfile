# ==============================================================================
# STAGE 1: Build React/Vite Frontend
# ==============================================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig*.json vite.config.ts index.html ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm run build

# ==============================================================================
# STAGE 2: Python Sovereign Daemon & Integrated Static Host
# ==============================================================================
FROM python:3.11-slim AS production
WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PORT=5050 \
    BIND_HOST=0.0.0.0

# Install dependencies
RUN pip install --no-cache-dir google-generativeai requests

# Copy backend files
COPY outreach/ ./outreach/
COPY src/data/ ./src/data/

# Copy compiled frontend from builder
COPY --from=frontend-builder /app/dist ./dist

# Initialize SQLite database
RUN python -c "from outreach import db; db.init_db(); db.sync_to_csv_and_ts()"

EXPOSE 5050

CMD ["python", "outreach/crm_daemon_bridge.py"]
