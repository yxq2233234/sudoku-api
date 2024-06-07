## Description

一个基于nestjs的数独项目，使用了swagger作为api文档生成工具，使用了typeorm作为数据库操作工具，使用了sqlite作为数据库，使用了jest作为单元测试工具。

通过环境变量`DB`设置sqlite数据库文件路径，默认为`./data/data.db`。

运行后访问 `http://localhost:3000/api` 可以查看api文档。

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# docker 打包
```bash
docker build -t sudoku .
docker run -p 3000:3000 sudoku
```