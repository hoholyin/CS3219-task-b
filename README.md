# CS3219 Task B

## (B1) Run the API locally
Note: These instructions are written to run the API on Mac.

1. In the terminal, run the following code first configure an alias. This is because in MacOS Catalina, system files are **read-only** and 
therefore, we cannot put our local /data/db file there
```
alias mongod="sudo mongod --dbpath /Users/hoholyin/data/db"
```

In future runs, we can just run the following to start the Mongo Daemon:
```
mongod
```

2. (Optional) To test if we have a connection, run (in another terminal window) the following:
```
mongo
```

3. In a new terminal window, navigate to the root directory of the project and run the following:
```
node index.js
```

4. All the API are ready on `localhost:8080`. To test, we can send a GET request:
```
http://localhost:8080/api/contacts
```
We expect to see the following result:
```
{"status":"success","message":"Contacts retrieved successfully","data":[]}
```
