#Prerequisite
1. Laravel 7.3
2. Mysql
3. Install composer
4. Install npm

#Steps
1. Export dropee.sql to your host(File in root folder).

2. Configure mysql as follow:
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=dropee
    DB_USERNAME=root
    DB_PASSWORD=

3. Put the folder in your webserver dir such as www/

4. Cd to the folder.

5. Run "composer install".

6. Run "npm install"

7. Run "php artisan serve'

8. Go to http://localhost:8000 on your browser. This development is tested on chrome and firefox.

