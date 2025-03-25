# ใช้ Node.js image
FROM node:18-alpine AS build

# กำหนด working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm install --frozen-lockfile

# คัดลอกโค้ดทั้งหมดไปที่ container
COPY . .

# Build โปรเจกต์ React
RUN npm run build

# กำหนด working directory สำหรับ server
WORKDIR /app

# เปิดพอร์ต 3000
EXPOSE 3000

# รัน server.js เมื่อ container เริ่มทำงาน
CMD ["npm", "run", "preview"]
