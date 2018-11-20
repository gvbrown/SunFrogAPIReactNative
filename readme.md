React Native Library For SunFrog API 

## Requirements

* Built on React 16.5, React Native 0.57
* Base64 encoder / decoder https://www.npmjs.com/package/base-64

## Getting started

Create an account and obtain your API keys at https://manager.sunfrog.com/
Your authentication details should be passed to the SunFrogAPI object upon
object instantiation. 

Before making any calls to the API, be sure to use the createSignup method 
to create a profile for your orders and products.  createSignup can be used
to create sub accounts under your main API dev account, which is useful in 
both single user and multiuser environments. 

## Documentation

Detailed API documentation can be found at https://manager.sunfrog.com/ 

This library can be included in any React Native project to communicate with 
the SunFrog API. 

Methods included in this Library
**setAuth( apiNumber, apiKey)** 
Sets the auth information after object instantiation. 

**setUserProfile( apiUserProfile, apiUserEmail, apiPassword )** 
Sets the user profile authentication details after object instantiation. 
This method can be used to change the current profile that is 
communicating with the API.  

**callAPI ( endPoint, payload )** 
Generic method to communicate with the API.  This is abstracted and used for most of the functions
within the SunFrogAPI object.  Can be used include other calls not included with this library.  


## License

SunFrogAPIReactNative is licensed under the Apache License, Version 2.0
http://www.apache.org/licenses/LICENSE-2.0
