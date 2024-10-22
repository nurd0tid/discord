# Gunakan Node.js versi 20
FROM node:20

# Set direktori kerja di dalam container
WORKDIR /app

# Salin semua file ke dalam container
COPY . .

# Instal dependencies menggunakan Yarn
RUN yarn install

# Build aplikasi
RUN yarn build

# Jalankan aplikasi
CMD ["yarn", "start"]
