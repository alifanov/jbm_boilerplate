# django_react_blog

Example of integration React/Redux and Python/Django frameworks in creating blog application

I used pipenv for working with python virtual env. For installing python packages:

```
pipenv --three
pipenv shell
pipenv install
```

## Structure of project

### project

Django project provided API creatd with django-rest-framework.
For run project use:
```
manage.py runserver
```
I you change frontend files you should update them:
```
cd project/frontend
yarn build
```

### project/frontend

React app created with create-react-app. Frontend files connected via django static provider.
You can work only with React app via yarn:
```
cd project/frontend
yarn start
```
