FROM python:3.6
RUN apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y
RUN apt-get install -y apt-utils
RUN apt-get install -y nano wget
RUN apt-get install -y python-imaging
RUN apt-get install -y build-essential cmake libboost-all-dev python3-dev
RUN pip install dlib

COPY requirements.txt /var/www/requirements.txt
WORKDIR /var/www
RUN pip install -r requirements.txt

ADD . /var/www

RUN python /var/www/manage.py migrate
CMD python /var/www/manage.py runserver 0.0.0.0:80

EXPOSE 80
