### react? In a React form, the server should know about every new character or deletion as soon as it happens.

1. shallow clone: … can just clone the first level key-value pair unchangedly
2. Make all rules being validated
```javascript
checkValidity(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!==''&&isValid; 
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength&&isValid;
        }
        return isValid;
    }
```
