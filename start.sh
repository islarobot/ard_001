#!/bin/bash

#python server.py

#node server.js

gnome-terminal -- python server.py

delay 2

gnome-terminal -- node server.js


google-chrome http://localhost/html/sonar_new.html:8000

delay 4

gnome-terminal -- node arduino_connection.js 0

