# Asteroid Data Collector


## About
To run this program, you must have a **NASA API Key** which you can get from: [link](https://api.nasa.gov/).
The essence of this program is that once it fetches current data from the NASA API, it creates a CSV file
if it doesn't already exist (nasa_data.csv) and writes it's data to that file.


## Further Extensions
This program runs best when scheduled which can be done using the Task Schedule Manager in Windows but 
use whatever means you have at your disposal. I automated mine by running an added shell script that I
called *main.sh*.


## Git Clone
To clone this repo on your own machine, run the following code:
```
git clone https://github.com/aryan-banwait/asteroidDataCollector
```
