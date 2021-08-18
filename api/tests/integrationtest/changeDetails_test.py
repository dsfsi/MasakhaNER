import unittest
import requests
import json
import jwt
from datetime import datetime, timedelta
#sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
import os, sys
sys.path.append('api')
from main import app

class Test(unittest.TestCase):
    main=None

    def setUp(self):
        app.config.from_object('config_default.Config')
        self.main = app.test_client()


    def test_endpoint(self):
        INPUT = {
        "id": 192,
        "firstname": "first",
        "lastname": "person",
        "email": "fp@gmail.com",
        "password": "password",
        "isadmin":False,
        "verified":True
        }
