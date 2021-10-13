# 跨域资源共享COSF (Cross-Orign Resource Sharing)



## 1对于简单请求（Get,Post,Head）

1. 浏览器发送跨域http请求时，会有一个额外的头部 Origin.包含了发送该请求源站的url.

2. 如果服务器决定响应请求，就会加入 Access-Control-Allow-Origin:<请求源站的url> .
3. 浏览器收到响应后看到有该头部字段就不会丢弃响应。
4. ​         



## 2对于复杂请求

 1.浏览器先发送预检请求。

 2.服务的返回相应报文后，有以下字段

Access-Control-Allow-Origin: 表示可以允许请求的源，可以填具体的源名，也可以填`*`表示允许任意源请求。

Access-Control-Allow-Methods: 表示允许的请求方法列表。

Access-Control-Allow-Credentials: 简单请求中已经介绍。

Access-Control-Allow-Headers: 表示允许发送的请求头字段

Access-Control-Max-Age: 预检请求的有效期，在此期间，不用发出另外一条预检请求。

 3.客户端根据预检响应报文判断复杂请求可发送后，然后才发送真正的http请求。

