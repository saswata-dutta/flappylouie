from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

import configparser
import sqlalchemy as db

HEADERS = {'Content-type': 'application/json', 'Accept': 'text/plain'}
app = Flask(__name__)
CORS(app)
# Parse configs
config = configparser.RawConfigParser()
config.read('config.properties')

# Database - configs
database_info = dict(config.items('database_info'))

user = str(database_info['user'])
pwd = str(database_info['password'])
host = str(database_info['host'])
database1 = 'leaderboard'

temp1 = 'postgresql://'+user+':'+pwd+'@'+host+':5432/'+database1

engine = db.create_engine(temp1)

@app.route('/scoreboard')
def get_scoreboard():
    query = '''
    SELECT "username", "score" FROM public."scores"
    ORDER BY "score" DESC
    LIMIT 10;
    '''

    with engine.connect() as conn:
        # asset code to RIC mappings
        scores = conn.execute(query)
        scores = scores.fetchall()
        conn.close()

    for i in range(len(scores)):
        scores[i] = list(scores[i])

    return jsonify(scores)

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    password = request.args.get('password')

    query = '''
        SELECT * FROM public."users"
        WHERE ("username" = '{}');
    '''.format(username)

    max_score = None
    with engine.connect() as conn:
        # asset code to RIC mappings
        users = conn.execute(query)
        users = users.fetchone()
        if users is None or len(users) == 0:
            insrt = '''
                INSERT INTO public."users"
                VALUES ('{}', '{}');
            '''.format(username, password)
            conn.execute(insrt)
            max_score = 0
        elif users[1] == password:
            max_score = get_current_score(username)
        else:
            max_score = 'Wrong Password'
        conn.close()

    return jsonify({"output": max_score})

@app.route('/update_score', methods=['POST'])
def update_score():
    username = request.args.get('username')
    score = int(request.args.get('score'))

    max_score = get_current_score(username)
    if max_score is None:
        with engine.connect() as conn:
            # asset code to RIC mappings
            insrt = '''
                INSERT INTO public."scores"
                VALUES ('{}', '{}');
            '''.format(username, score)
            conn.execute(insrt)
            conn.close()
        max_score = score
    
    elif score > max_score:
        query = '''
            UPDATE public."scores"
            SET score = {}
            WHERE username = '{}'
        '''.format(score, username)
        with engine.connect() as conn:
            conn.execute(query)
            conn.close
        max_score = score

    return jsonify({"output": max_score})


def get_current_score(username):
    query = '''
        SELECT score FROM public."scores"
        WHERE ("username" = '{}');
    '''.format(username)
    with engine.connect() as conn:
        max_score = conn.execute(query).fetchone()
        if max_score is None or len(max_score) == 0:
            max_score = None
        else:
            max_score = max_score[0]
        conn.close()
    
    return max_score

if __name__ == "__main__":
    app.run(debug=True, port=8000)