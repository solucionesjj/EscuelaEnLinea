#!/bin/bash
xfce4-terminal --tab --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/Api" --command="nodemon server.js" 
xfce4-terminal --tab --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/httpClient" --command="ng serve" 
xfce4-terminal --tab --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/" --command="code ." 
chromium-browser --incognito http://localhost:4200 


