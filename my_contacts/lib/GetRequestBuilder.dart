import 'dart:developer';

import 'RequestBuilder.dart';
import 'package:http/http.dart' as http;

class GetRequestBuilder extends RequestBuilder {
  @override
  Future<http.Response> sendRequest() async {
    mountRequest();
    log('GET request to:' + finalUrl);
    return http.get(finalUrl);
  }
}