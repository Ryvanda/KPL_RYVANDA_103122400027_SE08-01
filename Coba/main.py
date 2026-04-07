import json
data + {
    "name": "John Doe",
    "age": 30,
}

json_str=json.dumps(data)
print(data['name'])
print(json_str)
print(data=json.loads(json_str))