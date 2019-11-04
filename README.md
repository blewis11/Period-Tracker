### Requirements
* Docker and Docker-Compose installed

### To Run && Brief Demo
* Clone the repository
```
git clone https://github.com/blewis11/Period-Tracker && cd Period-Tracker
```

* Build the image
```
docker-compose up
```

* Wait for the images to build, you'll see a bunch of output in the terminal
![](./helperImages/docker-compose-text.png?raw=true)

* Run the following command to check that both the db and api are running
```
docker ps
```
![](./helperImages/docker-ps.png?raw=true)

* Navigate to http://0.0.0.0:49160 and you should see "fallback endpoint" on the screen
![](./helperImages/fallback.png?raw=true)

* Go to http://0.0.0.0:49160/cycles/average and you will see the default average cycle, which is 0
![](./helperImages/default-cycle.png?raw=true)

* On Postman, or any http interface, make a POST request to http://0.0.0.0:49160/events - passing in the following params (and setting Content-Type to application/json)
![](./helperImages/postman-params.png?raw=true) 

* This inserts a new UserSymptom for user 1, implicating that they're begun a new cycle a month after the beginning of their previous cycle

* Go to http://0.0.0.0:49160/cycles/average and you will see the average cycle has changed to 15.5
(user 1 has an average cycle length of 31, user 2 still has an average cycle of 0 - thus the average is 31/2 = 15.5)
![](./helperImages/updated-cycle.png?raw=true)

* That's the jist of it! The API will return an error message if a nonexisting user or symptom id is passed through, as well as if any of the inputs are null - and the overall average is only adjusted when a bleeding-type symptom (ids of 1,2,3) are submitted

### The Overall Design
The database structure is comprised of:
* **Users** : An object that describes a user, it only contains an id and a cycleAverage field
* **Symptoms**: An object that describes symptoms, it contains an id and a description (as specified in the assignment description)
* **UserSymptoms**: A junction object that ties a user to a symptom on a given day. A user can have many symptoms. The object contains an id, symptomId, and a userId.

I decided create separate objects for these because it allows for more flexibility. Instead of having symptoms hard-defined, it's possible to add or edit symptoms from the database side. I also wanted to use UserSymptoms because it means that creating and tracking events related to a users cycle is much more scalable.

Another major design decision I made was to make averageCycle a field on the User object. Calculating this for an individual user is trivial and doesn't take too much time. Calculating them for every user at once, however, could get messy. Whenever a UserSymptom that represents a day of bleeding is created, the corresponding user will have their averageCycle updated. The /cycles/average endpoint thus only needs to fetch all the cycleAverages from each user and average those together. There were lots of ways to do this but when I started this challenge that one made the most sense to me.

The application comes with the following default data, which you can find in src/database/defaultData. It's essentially two users, one of whom has data entered for their period (lasting from 2019-04-23 until the 2019-04-24). Both users have an average cycle of 0, since there isn't enough data present to calculate. By creating UserSymptoms you can see how the overall average is altered.


### Future improvements
* This one is a bug: in the handler for /events - the symptom and user ids are not type checked. If you pass through a string value that cannot be converted into a number, the server will crash. This can be solved by simply using a typeof check. I didn't have time to do this

* if the UserSymptom is created that represents a bleeding day, and another bleeding UserSymptom already exists on the same day - then currently the database will contain two different bleeding heaviness symptoms for a user on the same day (you can't have both a heavy and a light flow in the same day...right?). In the future I would change this to instead overwrite the existing symptom

* Similar to the above - if a UserSympton is submitted that already exists (same userId, symptomId, and timestamp) - this code will not check. In the future this would need to be checked and any duplicated ignored

* I wanted to return 404 and 400 statuses when the request parameters were invalid or non-resolveable. Unfortunately I got: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client. If I had more time I would solve that issue, currently its confusing if the service returns a 200 upon an invalid request

* Currently I only have one unit test -> src/utils/calculateCycleAverage. I'd write more for my modules, that ways its much easier to detect bugs and pinpoint where they're coming from. I would also write more usecases on the integration test (ie having invalid string and symptom ids like in the first point)

* A pretty basic one but, i'd integrate TSLint - I can't often rely on only myself to make code pretty
