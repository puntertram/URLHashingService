FROM mysql:latest 

COPY ./db_ddl_scripts /db_ddl_scripts

ENV MYSQL_ROOT_PASSWORD=password123

EXPOSE 3308

CMD ["mysqld"]




