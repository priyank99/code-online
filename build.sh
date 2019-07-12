sudo docker build -t p/sucode .
sudo docker images
sudo docker run -p 80:3000 -d p/sucode

docker cp ./routes/index.js p/sucode:./routes/index.js
