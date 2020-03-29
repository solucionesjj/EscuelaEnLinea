#!/bin/bash
io.elementary.terminal --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/Api" --commandline="nodemon server.js" 
io.elementary.terminal --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/httpClient" --commandline="ng serve" 
io.elementary.terminal --working-directory="/home/jmartinez/Documents/Desarrollo/EscuelaEnLinea/" --commandline="code ." 
google-chrome --incognito http://localhost:4200 &

