# 前端也学点nginx
## nginx是高性能`反向代理`服务器

### 关于代理
* `正向代理`是为客户端做的代理，可以通过这个代理访问到前端无法直接访问的资源;
* `反向代理`是为服务器做的代理，代理服务器接收客户端的请求，然后转发，负载均衡等。

## nginx配置
* `events`
* `http`

示例：
```
events {

}
http {
  upstream {

  }

  server {
    lcoation path {
      ...
    }

    location path {
      ...
    }
  }

  server {

  }
}
```

## 内置变量

