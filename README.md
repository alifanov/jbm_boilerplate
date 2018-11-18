# Jetbootsmaker boilerplate

Boilerplate for app on React/Redux, ReactNative/Redux and Python/Django frameworks. With example of app working with CV (face age prediction).

I used pipenv for working with python virtual env. For installing python packages:

```
pipenv --three
pipenv shell
pipenv install
```

## Structure of project

### project

Django project with API creatd with django-rest-framework.

### project/frontend

React app created with create-react-app. Frontend files connected via django static provider.

### project/mobile

React native app created with expo framework.

### project/vision

Test model for example application for face age prediction.
Used by django application.
