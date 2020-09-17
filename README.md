# CS3219 Task B
To run the project, please install the following (Using Homebrew for Mac):
- `node`
- `mongoDb`
- `nodemon`

## Task B1 
### Run the API locally
Note: These instructions are written to run the API on Mac.

1. In the terminal, run the following code first configure an alias. This is because in MacOS Catalina, system files are **read-only** and 
therefore, we cannot put our local /data/db file there
```
mkdir -p /Users/<your-usernmae>/data/db
alias mongod="sudo mongod --dbpath /Users/<your-username>/data/db"
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

- `GET /api/contacts`: Returns a list of contacts
- `POST /api/contacts`: Adds a new contact to the list
  - Fields:
     - name, email, phone, gender
  - Returns a data object with the details of the contact and the assigned contact id
- `GET /api/contacts/:contact_id`: Return a contact corresponding to the given id
- `PATCH /api/contacts/:contact_id`: Updates a contact corresponding to the given id
  - Fields:
     - name, email, phone, gender
- `PUT /api/contacts/:contact_id`: Updates a contact corresponding to the given id
  - Fields:
     - name, email, phone, gender
- `DELETE /api/contacts/:contact_id`: Deletes a contact corresponding to the given id

## Task B2
To run tests locally:
```
npm test
```

To run tests via travis, just push code to the repository or press 'Restart build' in travis at this link:
https://travis-ci.org/github/hoholyin/CS3219-task-b

## Task B3
Travis will automatically deploy the app to AWS Lambda using `severless`.

The app is hosted on https://dfd4c1ml8g.execute-api.ap-southeast-1.amazonaws.com/dev/

The api is available at https://dfd4c1ml8g.execute-api.ap-southeast-1.amazonaws.com/dev/api

