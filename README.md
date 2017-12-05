# koa-server
A server of koa

## Structure

  ```
  .
  ├── cli                      # 打包，清理脚本
  ├── config                   # 配置文件
  ├── dist                     # 打包之后的文件
  ├── middleware               # Koa 一些中间件
  ├── public                   # 静态资源（web 服务器）
  ├── router                   # API 实现
  └── index.js                 # 入口文件
  ```

## Usage

```bash
# 安装依赖包
npm run install

# 清除打包目录
npm run clean

# 打包
npm run compile

# 开启服务（监听模式）
npm run watch

# 开启服务（development）
npm run dev

# 开启服务（production）
npm run start

```

## License

[MIT](https://github.com/lianruhe/koa-server/blob/master/LICENSE)
