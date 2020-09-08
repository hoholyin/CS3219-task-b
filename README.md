# CS3219 Task B

## Task B1 
### Run the API locally
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
### Accessing the deployed API
The app is hosted on https://cs3219-task-b1.herokuapp.com/
The api is available at https://cs3219-task-b1.herokuapp.com/api

GET /api/contacts: Returns a list of contacts
POST /api/contacts: Adds a new contact to the list
  - Fields:
     - name, email, phone, gender
GET /api/contacts/:contact_id: Return a contact corresponding to the given id
PATCH /api/contacts/:contact_id: Updates a contact corresponding to the given id
PUT /api/contacts/:contact_id: Updates a contact corresponding to the given id
DELETE /api/contacts/:contact_id: Deletes a contact corresponding to the given id
