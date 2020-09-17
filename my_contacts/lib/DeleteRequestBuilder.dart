import 'dart:convert';

import 'package:http/http.dart' as http;
import 'RequestBuilder.dart';

class DeleteRequestBuilder extends RequestBuilder {
  Map<String, String> body;

  RequestBuilder addBody(Map<String, String> body) {
    this.body = body;
    return this;
  }

  @override
  Future<http.Response> sendRequest() async {
    mountRequest();
    return http.delete(
      finalUrl,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
  }
}
