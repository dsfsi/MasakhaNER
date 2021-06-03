from api.database.email import Email
from flask import Flask
import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os
from flask import request

load_dotenv()

class User:
    def __init__(self):
        self.DB_HOST=os.environ.get('DB_HOST')
        self.DB_NAME=os.environ.get('DB_NAME')
        self.DB_PASS=os.environ.get('DB_PASS')
        self.DB_USER=os.environ.get('DB_USER')
        self.conn = psycopg2.connect(dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)
        self.cur = self.conn.cursor()

    def register(self, firstname, lastname, email, password):
        code='1111'
        self.cur.execute(f"INSERT INTO users (firstname,lastname,password,email,isadmin,activationcode) VALUES('{firstname}','{lastname}','{password}','{email}',{True},{code})")
        sendemail = Email()
        message =  """\
        Subject: Masakhane Activation Code

        Here is your activation code: 1111 """
        sendemail.send_email(message, email)
        self.conn.commit()
        self.cur.close()
        self.conn.close()

    def get_code(self,email):
        self.cur.execute(f"SELECT activationCode FROM users where email='{email}';")
        return self.cur.fetchone()[0]
        

    def login(self, email, password):
        print('login')
        self.cur.execute(f"SELECT password FROM users where email='{email}';")
        one=self.cur.fetchone()
        self.conn.commit()
        self.cur.close()
        self.conn.close()
        print(one)
        if one!=None and one[0] == password:
            return True
        else:
            return False

    def update_user(self,email):
        self.cur.execute(f"SELECT * FROM users where email='{email}';")
        self.cur.execute(f"Update users set firstname = 'VERIFIED' where email='{email}';")
        self.conn.commit()
        self.cur.close()
        self.conn.close()





# DB_HOST=os.environ.get('DB_HOST')
# DB_NAME=os.environ.get('DB_NAME')
# DB_PASS=os.environ.get('DB_PASS')
# DB_USER=os.environ.get('DB_USER')
#  print('test')
# conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)
# cur = conn.cursor()

#cur.execute("CREATE TABLE user (id SERIAL PRIMARY KEY, name VARCHAR, lastname VARCHAR);")
#cur.execute("INSERT INTO student (name) VALUES(%s)", ("Sihle",))

# cur.execute("DELETE FROM users WHERE firstname='Khotso';")

# cur.execute("SELECT * FROM users;")

# print(cur.fetchall())


