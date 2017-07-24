# OwlBook Server
The unoffical API for the University of Western OWL service written in NodeJS.

## How to Setup
The required modules are listed below.
* async
* cookie-parser
* express
* osmosis

**Once the modules are all set up, simply run the server.js and the rest will be taken care of.**

    node server.js

## How to Use
    GET /api/student/validate
Used to validate a student account.

### Parameters
**Headers**
* eid --> The student's user id.
* pw --> The student's password.

**Returns a student JSON Object if the account exists.**

    {
      "id": ""
      "pass": "",
      "cookies": {
          "JSESSIONID": "",
          "NSC_pxm.vxp.db--443": ""
      },
      "courses": [],
      "course_url": ""
    }

**Returns an error if the account does not exist: _INVALID CREDENTIALS_**

    
