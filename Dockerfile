# base image
FROM node:18

# working directory
WORKDIR /app

# dependencies 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 실행
CMD ["npm", "run", "start:prod"]
