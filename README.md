#### Requirements
* Docker and Docker-Compose installed

#### To Run
* Clone the repository
```
git clone https://github.com/blewis11/Period-Tracker && cd Period-Tracker
```

* Build the image
```
docker-compose up
```

* Wait for the images to build, you'll see a bunch of output in the terminal

* Run the following command to check that both the db and api are running
```
docker ps
```

#### Future improvements

if the symptom is a period heaviness, and an entity already exists on the same day -> overwrite

if symptom not for period heaviness, and entity already exists on the same day -> do not insert

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

Also improve the integration tests

TSLint
