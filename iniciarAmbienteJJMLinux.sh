#!/bin/bash
konsole --new-tab --workdir "/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/Api" -e "nodemon server.js" &
konsole --new-tab --workdir "/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/httpClient" -e "ng serve" &
konsole --new-tab --workdir "/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/" &
konsole --new-tab --workdir "/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/" -e "code ." &
brave-browser http://localhost:4200 &

