#install nvm node version manager
#https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/

#sudo apt-get install -y curl build-essential libssl-dev git

#wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

#nvm install node

wget https://nodejs.org/download/release/v9.0.0/node-v9.0.0-linux-x64.tar.gz
sudo tar -xf node-v9.0.0-linux-x64.tar.gz --directory=/usr/local --strip-components=1
npm install node-ipc@9.0.0
npm install express
npm install socket.io@2.0
npm install serialport
sudo apt install python2-minimal

