FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db reach-engine --collection Users --type json --file /init.json --jsonArray
