
import 'package:http/http.dart';

abstract class RequestBuilder {
  static final String baseUrl = 'https://cs3219-task-b1.herokuapp.com/api/';
  List<String> paths = [];
  Map<String, String> params = new Map();
  String finalUrl = baseUrl;

  RequestBuilder addPath(String pathname) {
    paths.add(pathname);
    return this;
  }

  RequestBuilder addParams(String param, String value) {
    params[param] = value;
    return this;
  }

  void mountRequest() async {
    String url = baseUrl;
    for (var path in paths) {
      url += path + '/';
    }
    url = url.substring(0, url.length - 1);
    if (params.isNotEmpty) {
      url += '?';
      params.forEach((key, value) {
        url += key + '=' + value + '&';
      });
      url = url.substring(0, url.length - 1);
    }
    finalUrl = url;
  }

  Future<Response> sendRequest();
}