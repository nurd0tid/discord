# Gunakan Node.js versi 19
FROM node:19

# Set direktori kerja di dalam container
WORKDIR /app

# Salin semua file ke dalam container
COPY . .

# Instal dependencies
RUN npm install

# Build aplikasi
RUN npm run build

# Jalankan aplikasi
CMD ["npm", "start"]
