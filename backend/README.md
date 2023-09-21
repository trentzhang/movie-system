# Backend for Movie System

# Database design

- fav_list

  | list_id | user            | is_owner |
  | ------- | --------------- | -------- |
  | 7       | test2@gmail.com | 1        |
  | 9       | test@gmail.com  | 1        |
  | 9       | test2@gmail.com | 0        |

- List

  | id  | name           | description      | creator         | liked |
  | --- | -------------- | ---------------- | --------------- | ----- |
  | 7   | test List      | description      | test2@gmail.com | 0     |
  | 9   | test List Name | List Description | test@gmail.com  | 1     |

- list2movie

| movie_id  | list_id |
| --------- | ------- |
| tt0076043 | 1       |
| tt0076043 | 7       |
| tt0078806 | 9       |

- movie

| id        | title     | release_year |
| --------- | --------- | ------------ |
| tt0076043 | Fontamara | 1980         |

| runtime | type  | description     |
| ------- | ----- | --------------- |
| 139     | Drama | Fontamara is... |

| cover       | production                                          |
| ----------- | --------------------------------------------------- |
| https://xxx | esErre CinematograficaRAI Radiotelevisione Italiana |

| language | liked_num | rating | rate_num |
| -------- | --------- | ------ | -------- |
| Italian  | 1         | 3.4    | 1        |

- movie_comments

| id  | user_email      | movie_id  | comment      | created_time        | username |
| --- | --------------- | --------- | ------------ | ------------------- | -------- |
| 4   | test2@gmail.com | tt0076043 | comment      | 2022-12-11 02:23:45 | test2    |
| 5   | test2@gmail.com | tt0076043 | test comment | 2022-12-11 22:04:55 | test2    |

- mp

| num    | movie_id  | ordering | actor_id  | category        | job | characters        |
| ------ | --------- | -------- | --------- | --------------- | --- | ----------------- |
| 642920 | tt0076043 | 10       | nm0005919 | cinematographer | \N  | \N                |
| 642921 | tt0076043 | 1        | nm0686375 | actor           | \N  | ["Berardo Viola"] |
| 642922 | tt0076043 | 2        | nm0223652 | actress         | \N  | ["Maria Rosa"]    |
| 642923 | tt0076043 | 3        | nm0613863 | actress         | \N  | ["Elvira"]        |
| 642924 | tt0076043 | 4        | nm0685222 | actress         | \N  | ["Maria Grazia"]  |

- People

| id        | name           | date_of_birth | profession            | bio               | photo       | place_of_birth             |
| --------- | -------------- | ------------- | --------------------- | ----------------- | ----------- | -------------------------- |
| nm0000005 | Ingmar Bergman | 1918          | writer director actor | Ernst Ingmar..... | https://xxx | Fårö, Gotlands län, Sweden |

- rating

| user           | movie_id  | rating |
| -------------- | --------- | ------ |
| test@gmail.com | tt0076043 | 3.4    |

- Tag

- Tag2List

- user

| username  | email           | token  | gender | birthday   | avatar |
| --------- | --------------- | ------ | ------ | ---------- | ------ |
| test user | test@gmail.com  | XYZHSB | male   | 2000-10-10 | NULL   |
| test2     | test2@gmail.com | XYZHSB | male   | 1997-01-01 | NULL   |

- user_liked_list

- user_liked_movie

| id  | user_email     | movie_id  |
| --- | -------------- | --------- |
| 10  | test@gmail.com | tt0078113 |
| 11  | test@gmail.com | tt0078113 |
| 12  | test@gmail.com | tt0076043 |

# API Design

#### Listing new/overwriting existing stubs & proxy configs

<details>
 <summary><code>GET</code> <code><b>/homepage</b></code> <code>(gets movie/list json data for homepage)</code></summary>

##### Parameters

> | name  | type                | data type | description                                               |
> | ----- | ------------------- | --------- | --------------------------------------------------------- |
> | limit | required, default=5 | int       | max number of results to return for either movie for list |

##### Responses

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{ message: "OK", data: homepage }`      |
> | `500`     | `application/json` | `{"code":"400","message":"Bad Request"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

## </details>

<details>
 <summary><code>GET</code> <code><b>/movies/:id</b></code> <code>(gets movie/list json data for homepage)</code></summary>

##### Parameters

> | name | type     | data type | description  |
> | ---- | -------- | --------- | ------------ |
> | ID   | required | string    | ID for movie |

##### Responses

> | http code | content-type       | response                                     |
> | --------- | ------------------ | -------------------------------------------- |
> | `200`     | `application/json` | `{ message: "OK", data: movie information }` |
> | `400`     | `application/json` | `{ message: "movie id doesn't exist."}`      |
> | `500`     | `application/json` | `{"code":"400","message":"Bad Request"}`     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

## </details>

---

#### Creating new/overwriting existing stubs & proxy configs

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(overwrites all in-memory stub and/or proxy-config)</code></summary>

##### Parameters

> | name | type     | data type             | description |
> | ---- | -------- | --------------------- | ----------- |
> | None | required | object (JSON or YAML) | N/A         |

##### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `201`     | `text/plain;charset=UTF-8` | `Configuration created successfully`     |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}` |
> | `405`     | `text/html;charset=utf-8`  | None                                     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

## </details>

---

#### Creating new/overwriting existing stubs & proxy configs

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(overwrites all in-memory stub and/or proxy-config)</code></summary>

##### Parameters

> | name | type     | data type             | description |
> | ---- | -------- | --------------------- | ----------- |
> | None | required | object (JSON or YAML) | N/A         |

##### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `201`     | `text/plain;charset=UTF-8` | `Configuration created successfully`     |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}` |
> | `405`     | `text/html;charset=utf-8`  | None                                     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

## </details>

---

#### Creating new/overwriting existing stubs & proxy configs

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>(overwrites all in-memory stub and/or proxy-config)</code></summary>

##### Parameters

> | name | type     | data type             | description |
> | ---- | -------- | --------------------- | ----------- |
> | None | required | object (JSON or YAML) | N/A         |

##### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `201`     | `text/plain;charset=UTF-8` | `Configuration created successfully`     |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}` |
> | `405`     | `text/html;charset=utf-8`  | None                                     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

</details>
