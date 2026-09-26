FROM node:20-alpine

WORKDIR /app

# Copy package files trước để tận dụng Docker cache layer
COPY package*.json ./

# Cài đặt dependencies (bao gồm cả prisma CLI để generate client)
RUN npm install

# Copy toàn bộ source code
COPY . .

# Generate Prisma Client bên trong container (quan trọng: engine binary phải build cho đúng platform Linux của container, khác với Windows máy bạn)
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "server.js"]