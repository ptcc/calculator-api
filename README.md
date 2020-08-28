# calculator-api

nodeJS api built with hapijs.
  
### `yarn start`

runs the calculator api on `http://localhost:4000`

### available routes:
#### `GET /evaluate/{expression}`
  - calculates the expression value 
  - can be any valid math expression, from a single number to combinations of may operations.
  - returns a JSON object with `{expression: "2+2", value: "4" }`
 
 if the expression contains an error return a status code `422` and an error message indicating where the Syntax error is found:
 ```
 {
  "statusCode": 422,
  "error": "Unprocessable Entity",
  "message": "Invalid expression. Syntax error at char 3."
 }
 ```

### `yarn test`

runs the unit tests
