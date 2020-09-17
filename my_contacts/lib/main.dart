import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

import 'Contact.dart';
import 'DeleteRequestBuilder.dart';
import 'GetRequestBuilder.dart';
import 'PostRequestBuilder.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Contacts',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String name;
  String email;
  String phone;
  String gender;
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final genderController = TextEditingController();

  List<Contact> contacts = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getContacts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text('MyContacts'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            SizedBox(height: 50),
            Text(
              'Add a new contact:'
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Name:'),
                  SizedBox(width: 10),
                  SizedBox(
                      width: 200,
                      child: TextField(
                        controller: nameController,
                        onChanged: (text) {
                          name = text;
                        },
                      )
                  ),
                ]
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Email:'),
                  SizedBox(width: 10),
                  SizedBox(
                      width: 200,
                      child: TextField(
                        controller: emailController,
                        onChanged: (text) {
                          email = text;
                        },
                      )
                  ),
                ]
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Phone:'),
                  SizedBox(width: 10),
                  SizedBox(
                      width: 200,
                      child: TextField(
                        controller: phoneController,
                        onChanged: (text) {
                          phone = text;
                        },
                      )
                  ),
                ]
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Gender:'),
                SizedBox(width: 10),
                SizedBox(
                  width: 200,
                  child: TextField(
                    controller: genderController,
                    onChanged: (text) {
                      gender = text;
                    },
                  )
                ),
              ]
            ),
            SizedBox(height: 50),
            ButtonTheme(
              minWidth: 300,
              height: 48,
              child: FlatButton(
                color: Colors.blue,
                textColor: Colors.white,
                onPressed: addContact,
                child: Text('Add contact'),
              ),
            ),
            SizedBox(height: 50),
            Column(
              children: generateContacts(),
            )
          ],
        ),
      ),
    );
  }

  List<Widget> generateContacts() {
    List<Widget> newContacts = [];
    newContacts.add(
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Text('Name'),
          Text('Email'),
          Text('Phone'),
          Text('Gender'),
          //SizedBox(width: 30, height: 30),
        ],
      )
    );
    newContacts.add(SizedBox(height: 20,));
    for (var contact in contacts) {
      Widget contactCard = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          SizedBox(
            width: 150,
            child: Text(contact.name),
          ),
          SizedBox(
            width: 150,
            child: Text(contact.email),
          ),
          SizedBox(
            width: 150,
            child: Text(contact.phone),
          ),
          SizedBox(
            width: 150,
            child: Text(contact.gender),
          ),
          ButtonTheme(
            minWidth: 30,
            height: 30,
            child: FlatButton(
              color: Colors.red,
              textColor: Colors.white,
              onPressed: () {
                deleteContact(contact.id);
              },
              child: Text('X'),
            ),
          ),
        ],
      );
      newContacts.add(contactCard);
    }
    return newContacts;
  }

  void deleteContact(String id) async {
    await DeleteRequestBuilder()
        .addPath('contacts')
        .addPath(id)
        .sendRequest();
    getContacts();
  }

  void addContact() async {
    await PostRequestBuilder()
        .addBody(<String, String>{
          "name": name, // need to add word bank
          "email": email,
          "phone": phone,
          "gender": gender,
        })
        .addPath('contacts')
        .sendRequest();
    nameController.clear();
    emailController.clear();
    phoneController.clear();
    genderController.clear();
    getContacts();
  }

  void getContacts() async {
    Response response = await GetRequestBuilder()
        .addPath('contacts')
        .sendRequest();
    dynamic jsonObject = json.decode(response.body);
    List<dynamic> data = jsonObject['data'];
    List<Contact> allContacts = data
        .map((c) => new Contact(c['name'], c['email'], c['phone'], c['gender'], c['_id']))
        .toList();
    allContacts.sort((a, b) => a.name.compareTo(b.name));
    setState(() {
      contacts = allContacts;
    });
  }
}
