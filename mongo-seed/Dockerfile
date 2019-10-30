FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db tracker_information --collection TestUsers --type json --file /init.json --jsonArray
