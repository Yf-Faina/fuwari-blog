---
title: docker 踩坑记录
published: 2025-06-22
description: ''
image: 'https://img.fainablog.tech/20250701195427095.png'
tags: [docker]
category: '部署'
draft: false
lang: 'CN'
---
最近为了~~修改实习简历的项目展示~~将某管理系统部署出来，选择了**容器化部署**的方式，为了白嫖PaaS服务，毕竟为了这个东西花那么高的成本去租服务器，我觉得是很没必要。

### 什么是docker ？

可以简单理解为一种轻量化的虚拟机。它不需要像虚拟机那样完整的重新虚拟一个新的操作系统$\rightarrow$更轻量化。

docker同样具有复用性高、拓展性强等优点。

### 项目概要

我想要部署的系统是前后端分离的，大致可以分为由vue3实现的前端部分+ASP.Net Core实现的后端部分+SQL的数据库部分。

由于Docker 和容器化技术的**核心原则之一：每个容器只运行一个进程/服务**$\rightarrow$我起码需要$3$个容器一起运行，所以简单的单一容器技术满足不了我的需求，最后采用docker compose技术实现。

#### 环境

项目的容器化部分在Windows 11系统、windows系统中的docker desktop实现。

### Dockerfile

Dockerfile是一个**文本文件**，其中包含了一系列用于**自动化构建 Docker 镜像的指令**。

Docker 会读取 Dockerfile 中的指令，一步一步地执行这些指令，最终生成一个可运行的 Docker 镜像。这个镜像包含了应用程序代码、运行时、库、依赖以及运行应用程序所需的一切。

#### 基本命令

| 命令        | 作用                                                                                            | 示例                                   |
| ----------- | ----------------------------------------------------------------------------------------------- | -------------------------------------- |
| `FROM`    | 指定基础镜像。所有的 Dockerfile 都必须以 `FROM` 指令开始                                      | `FROM ubuntu:22.04`                  |
| `WORKDIR` | 设置工作目录。后续的指令都会在这个工作目录下执行                                                | `WORKDIR /app`                       |
| `COPY`    | 从宿主机（构建环境）复制文件或目录到镜像中                                                      | `COPY . .`                           |
| `RUN`     | 在镜像构建过程中执行命令。每条 `RUN` 指令都会创建一个新的镜像层。常用于安装软件包、编译代码等 | `RUN npm run build`                  |
| `EXPOSE`  | 声明容器在运行时监听的端口                                                                      | `EXPOSE 80`                          |
| `CMD`     | 容器启动时默认执行的命令                                                                        | `CMD ["nginx", "-g", "daemon off;"]` |

使用 `docker build`命令，docker daemon会逐行解析 Dockerfile 中的指令，针对该文件构建镜像。

##### 多阶段建构

当一个Dockerfile文件中存在多个 `FROM`，每个 `FROM`语句都代表开始一个新的构建阶段。

可以将构建时所需的工具和依赖（例如 SDK、编译器）与最终运行时的环境分离，从而大大减小最终镜像的大小。

我针对前端以及后端的Dockerfile文件中都采用了多阶段建构。

### Docker Compose

docker-compose.yml文件是一种组织多个docker镜像一起工作的yaml文件。通过使用 `docker compose up`命令，就可以创建并启动所有服务。

### 坑一：前端 API 路径不对？Nginx 反向代理来拯救！

后端同时监听了两个端口，一个是HTTP下的5070端口，另一个是HTTPS的7069端口。

前端代码中配置了 `basePath`，通过如下⬇️方式指定了后端接口地址：

```typescript

constapi = newEmployeeApi(

  newConfiguration({

    basePath:'https://localhost:7069',

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    accessToken: (name?: string, scopes?: string[]) => {

      if (name === 'Bearer') {

        returnuser.token + '';

      }

      return'';

    },

    middleware: [loginMiddleWare],

  })

);

```

上述写法在本地开发环境下运行良好，但当前后端被分别打包进独立容器并部署后，问题就出现了：**前端无法成功请求后端 API 并获取数据**。这是因为 `basePath` 中写死了 `https://localhost:7069`，在容器中，前端实际上是在访问其自身容器的 7069 端口，而不是后端容器。由于前后端运行在两个完全隔离的容器中，使用 `localhost：7069` 无法实现跨容器通信。

此时，选择Nginx做网关进行反向代理是一个好的选择。

> 反向代理（Reverse Proxy）是一个位于客户端和服务器之间的中间服务，它的作用是代表客户端向后端服务器转发请求

**Nginx配置的方法**：

1. 项目根目录下按照如下文件结构创建相关文件夹和文件

```txt

    project/ 

    ├── docker-compose.yml 

    └── nginx/ 

        └── nginx.conf <-- 创建这个文件 

        └── conf.d/ <-- 创建这个目录

            └── default.conf <-- 创建这个文件

```

2. 分别在 `nginx.conf`和 `default.conf`文件中写好对应的配置内容
3. 需要在 `docker compose.yml`中添加Nginx的部分

```yaml

nginx:

    image: nginx:latest

    container_name: card-nginx

    restart: always

    ports:

      - "80:80"      # 将宿主机的 80 端口映射到 Nginx 容器的 80 端口

     # - "443:443"   # 如果需要 HTTPS, 可以取消注释此行，并配置 SSL 证书

    volumes:

     # 挂载宿主机上的 Nginx 主配置文件

      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro

     # 挂载宿主机上的 Nginx server block 配置目录

      - ./nginx/conf.d:/etc/nginx/conf.d:ro

    depends_on:

      - frontend  

      - backend  

    networks:

      - card-network

```

4. 端 API 客户端 `basePath`: 替换为 `http://localhost/api`

### 坑二：MySQL 容器启动了，数据库却是空的？

当我解决了上一个问题后，前端容器中仍然返回了500错误。查看后端服务的log后发现数据库已经连接成功了，但表格不存在。

```

MySql.Data.MySqlClient.MySqlException (0x80004005): Table 'card.employee' doesn't exist

```

通过Navicat连接Mysql映射端口查看发现其中确实一张数据表都没有，但本地开发时实际表格都存在。它背后通常隐藏着一个关键的认知差异：**你连接的数据库，可能并不是你以为的那个。**

#### 为什么会发生这种情况？

这个问题的根源在于，我们往往拥有多个 MySQL 实例：

1.**宿主机上的本地 MySQL 实例：** 许多开发者在本地电脑上安装了 MySQL，并通过像 Navicat、DataGrip、MySQL Workbench 这样的工具连接并管理它。

2.**Docker 容器内的 MySQL 实例：** 当使用 `docker-compose.yml` 启动 MySQL 服务时，Docker 会创建一个**全新且独立的 MySQL 容器**。这个容器是一个完全隔离的环境，它有自己的文件系统和数据目录。默认情况下，这个新启动的 MySQL 容器是**空的**，没有任何预设的数据库或表格，除非你明确指示它去初始化。

当发现 Docker MySQL 容器内没有数据表时，最大的可能性是：

-**数据库管理工具连接的是宿主机上的 MySQL，而不是 Docker 容器内的 MySQL。** 即使它们都监听 3306 端口（或者为 Docker MySQL 映射了其他端口），它们也是两个完全独立的数据库。

- 启动的 Docker MySQL 容器确实是空的。 我没有通过任何机制（如 SQL 脚本导入或 EF Core 迁移）来初始化它的数据库结构和数据。

#### 解决方式

在 Docker MySQL 容器启动时初始化数据。

当 MySQL 容器启动时，如果它的数据目录 `/var/lib/mysql` 是空的（也就是第一次启动或数据卷被清空），它会检查 `/docker-entrypoint-initdb.d` 目录。如果这个目录中存在 `.sql`、`.sh` 或 `.sql.gz` 文件，MySQL 容器会在启动数据库服务后自动执行这些脚本，从而创建表、插入数据、设置用户等。

1.**导出现有数据库的 SQL 脚本：**

- 使用你之前连接的、包含数据的那个 MySQL 实例（宿主机上的那个）。
- 连接到 数据库。
- 使用数据库管理工具将**整个数据库的结构和数据**导出到一个 `.sql` 文件中。

2.**创建初始化目录并放置 SQL 文件：** 在你的项目根目录下，创建一个新的目录，例如 `mysql-init`。将在上一步导出的 `.sql` 文件复制到这个 `mysql-init` 目录中。

   项目结构应该看起来像这样：

```

   project/

   ├── docker-compose.yml

   ├── nginx/

   ├── Card.Backend/

   ├── card-frontend/

   └── mysql-init/        # <--- 新建的目录

       └── init.sql       # <--- 导出的 SQL 文件放这里

```

3.**修改 `docker-compose.yml` 文件：** 在 `mysql` 服务的 `volumes` 配置中，添加一行，将你宿主机上的 `mysql-init` 目录挂载到 MySQL 容器内部的 `/docker-entrypoint-initdb.d` 目录。

```yaml

   services:

     mysql:

       image: mysql:8.0

       container_name: card-mysql

       restart: always

       environment:

         MYSQL_ROOT_PASSWORD: 123456

         MYSQL_DATABASE: card

       ports:

         - "3307:3306"

       volumes:

         - mysql_data:/var/lib/mysql           # 数据持久化卷

         - ./mysql-init:/docker-entrypoint-initdb.d:ro# <--- 添加这一行

       networks:

         - card-network

   # ... 其他服务和卷/网络定义

```

4.**删除旧的 Docker 数据卷并重新启动所有服务（非常重要！）** 因为 `docker-entrypoint-initdb.d` 目录下的脚本只在 MySQL 容器的**数据目录是空的**（即第一次启动或数据卷被清空）时才会执行。

- 停止并移除所有服务：

  ```bash

  docker-compose down

  ```
- 删除 MySQL 数据卷： 你需要找到你的数据卷的完整名称。可以运行 `docker volume ls` 来查看所有数据卷的列表。 然后删除它：

  ```bash

  docker volume rm card-management_mysql_data

  ```
  （请根据 `docker volume ls` 的实际输出调整卷名）
- 重新启动所有服务：

  这次，当容器启动时，它会发现 `mysql_data` 卷是空的，然后自动执行 `mysql-init/init.sql` 脚本，将的数据库结构和数据导入到数据库中。
