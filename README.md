# Gif Browsing APP (Frontend)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Build image using docker
```
docker build --build-arg api_url=http://example.com -t gif_browsing_app_web:1.0.0 .
```

### Run docker image

You can start the image typing
```
docker run --restart unless-stopped -d -p 80:80 --name gif_browsing_app_web gif_browsing_app_web:1.0.0
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
