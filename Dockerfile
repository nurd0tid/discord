# Gunakan Node.js versi 20
FROM node:20

# Set direktori kerja di dalam container
WORKDIR /app

# Salin semua file ke dalam container
COPY . .

# Instal dependencies menggunakan Npm
RUN npm install

# Build aplikasi
RUN npm run build

# Jalankan aplikasi
CMD ["npm", "start"]
