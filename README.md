Dicon 2015 홀가분(HOLGABUN)
========
**Research Book with grunt, bower, bootstrap**
--------
> - npm i
> - bower i

**node express, jade, jQuery**

--------
###DB_name = dicon2015
####table = users, questions

**users ->**
> CREATE TABLE users (
>   u_id INT(11) AUTO_INCREMENT,
>   u_name VARCHAR(255),
>   u_email VARCHAR(255),
>   u_pw VARCHAR(255),
>   u_ph VARCHAR(255),
>   u_self TEXT,
>   u_ph_secret CHAR(10),
>   u_email_secret CHAR(10),
>   PRIMARY KEY (u_id)
> )DEFAULT CHARACTER SET utf8;

**questions ->**
> CREATE TABLE questions (
>   id INT(11) AUTO_INCREMENT,
>   u_id INT(11),
>   question VARCHAR(255),
>   answer VARCHAR(255),
>   question_type VARCHAR(100),
>   ath CHAR(10),
>   secret CHAR(10),
>   create_time DATETIME,
>   finish_time DATETIME,
>   count INT(11),
>   user_join TEXT,
>   finish_vote CHAR(10),
>   PRIMARY KEY (id)
> )DEFAULT CHARACTER SET utf8;