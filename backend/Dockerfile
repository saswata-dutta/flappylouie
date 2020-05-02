FROM python:3.7.5
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD ./ /app
WORKDIR /app
RUN apt-get update
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
CMD [ "gunicorn", "-w", "4","-b", ":8000", "--graceful-timeout", "120","app:app" ]