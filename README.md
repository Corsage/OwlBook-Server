# OwlBook Server
The unoffical API for the University of Western OWL service written in NodeJS.

## How to Setup
The required modules are listed below.
* async
* cookie-parser
* express
* osmosis

**Once the modules are all set up, simply run the server.js and the rest will be taken care of.**

```
node server.js
```

## How to Use
```javascript
GET /api/student/validate
```

Used to validate a student account.

### Parameters
```
{header} eid // Student ID.
{header} pw // Student password.
```
    
**Returns a student JSON Object if the account exists.**
```
    {
      "id": ""
      "pass": "",
      "cookies": {
          "JSESSIONID": "",
          "NSC_pxm.vxp.db--443": ""
      },
      "course_url": ""
    }
```

**Returns an error if the account does not exist: _INVALID CREDENTIALS_**
___
```javascript
GET /api/courses?url=
```
Used to fetch an array of course objects based on the query url.

### Parameters
```
{query} url // course_url.
{cookie} JESSIONID // Western OWL Session ID.
{cookie} NSC_pxm.vxp.db--443 // Western OWL Encryption Key.
```

**Returns a JSON array of course objects if successful.
```
[
    {
        "title": "",
        "teacher": "",
        "section": "",
        "home_url": "",
        "grades_url": ""
    }
]
```
___
```javascript
GET /api/courses/assignments?url=
```
Used to getch an array of assignment objects based on the query url.

### Parameters
```
{query} url // grades_url.
{cookie} JESSIONID // Western OWL Session ID.
{cookie} NSC_pxm.vxp.db--443 // Western OWL Encryption Key.
```

**Returns a JSON array of assignment objects if successful.
```
[
    {
        "title": "",
        "due_date": "",
        "grade": "",
        "comments": ""
    }
]
```
___
```javascript
GET /api/student/full
```
Returns a full student object (student information, courses, and assignments).

### Parameters
```
{header} eid // Student ID.
{header} pw // Student password.
```

**Returns a full JSON student object if successful.
```
{
    "id": "sboyal2",
    "password": "Lockerz12!",
    "cookies": {
        "JSESSIONID": "f44f3362-03a1-43d3-ab74-496a6d29405d.azuki06",
        "NSC_pxm.vxp.db--443": "ffffffffaf157b0b45525d5f4f58455e445a4a4229a0"
    },
    "courses_url": "https://owl.uwo.ca/portal/tool-reset/33865228-8227-45ea-8b47-e211984fda85/?panel=Main",
    "courses": [
        {
            "title": "APPLMATH 1413",
            "teacher": "allanb",
            "section": "001",
            "home_url": "https://owl.uwo.ca/portal/site/36e3e636-b02a-4837-8951-dfe62e603d4f",
            "grades_url": "https://owl.uwo.ca/portal/tool-reset/87181db9-3e65-430e-9915-5631abd6e155/?panel=Main",
            "assignments": [
                {
                    "title": "Assign Grade",
                    "due_date": "-",
                    "grade": "(20/20)",
                    "comments": ""
                }
            ]
        }
    ]
}
```
