#!/bin/bash
xfce4-terminal --tab --default-working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/Api" --command="nodemon server.js" 
xfce4-terminal --tab --default-working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/httpClient" --command="ng serve" 
xfce4-terminal --tab --default-working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/" --command="code ." 
google-chrome --incognito http://localhost:4200 


