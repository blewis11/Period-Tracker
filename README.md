#### Requirements
* Docker and Docker-Compose installed

#### To Run && Brief Demo
* Clone the repository
```
git clone https://github.com/blewis11/Period-Tracker && cd Period-Tracker
```

* Build the image
```
docker-compose up
```

* Wait for the images to build, you'll see a bunch of output in the terminal
![](./helperImages/Screen Shot 2019-11-04 at 19.03.20.png)

* Run the following command to check that both the db and api are running
```
docker ps
```

* Navigate to 0.0.0.0:49160 and you should see "fallback endpoint" on the screen

* Go to http://0.0.0.0:49160/cycles/average and you will see the default average cycle, which is 0

* On Postman, or any http interface, make a POST request to http://0.0.0.0:49160/events - passing in the following params (and setting Content-Type to application/json)

* This inserts a new UserSymptom for user 1, implicating that they're begun a new cycle a month after the beginning of their previous cycle

* Go to http://0.0.0.0:49160/cycles/average and you will see the average cycle has changed to 15.5
(user 1 has an average cycle length of 31, user 2 still has an average cycle of 0 - thus the average is 31/2 = 15.5)

#### Future improvements

if the symptom is a period heaviness, and an entity already exists on the same day -> overwrite

if symptom not for period heaviness, and entity already exists on the same day -> do not insert

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

Also improve the integration tests

TSLint
