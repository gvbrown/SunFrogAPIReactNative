import base64 from 'react-native-base64';

class SunFrogAPI {

	apiUserProfile: string; 
    apiUserEmail: string; 
    apiPassword: string; 
    apiKey: string; 
    apiNumber: string;

	constructor( apiNumber, apiKey ) {
		this.apiKey = apiKey; 
		this.apiNumber = apiNumber; 
	}

	setAuth = ( apiNumber, apiKey ) => {
		//method to update auth details after object is instantiated.

		this.apiKey = apiKey; 
		this.apiNumber = apiNumber; 

		return true; 
	}

	setUserProfile = ( apiUserProfile, apiUserEmail, apiPassword ) => {
		// method to update only the user profile details
		this.apiUserProfile = apiUserProfile; 
		this.apiUserEmail = apiUserEmail; 
		this.apiPassword = apiPassword; 

		return true; 
	}

	callAPI = async (targetURL, payload) => {
		var headers = new Headers();
		headers.append("Authorization", "Basic " + base64.encode(this.apiNumber + ":" + this.apiKey));

		authPayload = {
			IAgree: 1, 
			username: this.apiUserEmail, 
			password: this.apiPassword
		}; 

		// concatenate our payload items
		requestPayload = { ...authPayload, ...payload };

		this.requestBody = JSON.stringify(requestPayload);

		response = await  fetch(targetURL, {
			headers: headers, 
			method: 'POST', 
			body: this.requestBody, 
		}); 

		try {
			responseJson = await response.json(); 
		} catch {
			// on error do something creative 
			console.log(response); 
		}
		
		return responseJson; 
	} 

	startBatch = async () => {
		/* creates a new batch */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Orders/' + this.apiUserProfile + '/startBatch.json';
        
        payload = '';
      	
      	response = await this.callAPI(apiUrl, payload)
      	
      	return response; 
    }

	clearBatch = async (batchid) => {
		/* clears an existing batch */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Orders/' + this.apiUserProfile + '/clearBatch.json';
        
        payload = {
        	batchID: batchid
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

	endBatch = async (batchid) => {
		/* ends a batch, sends to production */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Orders/' + this.apiUserProfile + '/endBatch.json';
        
        payload = {
        	batchID: batchid,
            transactionID: 'ReactSFAPI'
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

	finalizeBatch = async (batchid) => {
		/* finalizes a batch, calculates invoice costs */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Orders/' + this.apiUserProfile + '/finalizeBatch.json';
        
        payload = {
        	batchID: batchid
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

	getOrderStatus = async (orderid, email) => {
		/* obtains order status based on order and email */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Orders/Tracking/locate.json';
        
        payload = {
        	orderID: orderid, 
        	email: email 
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

	createSignup = async (name, email, password, company, address, city, state, zipcode, country) => {
		/* creates a sub account under the api dev account */ 
        apiUrl = 'https://api.sunfrogshirts.com/v1/Signup/addSignup.json';
        
        payload = {
        	name: name,
			email: email,
			Iagree:  1, 
			password: password,
			company: company,
			address: address,
			city: city,
			state: state,
			zipcode: zipcode,
			country: country 
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

    createMockup = async (Mockup) => {
    	/* creates a mockup group */ 
    	apiUrl = 'https://api.sunfrogshirts.com/v1/mockups/' + this.apiUserProfile + '/addMockup.json';
        
        payload = {
			aiFile: Mockup.aiFile, 
			aiFileBack: Mockup.aiFileBack, 
			imageFile: Mockup.imageFile, 
			imageFileBack: Mockup.imageFileBack, 
			mockupType: Mockup.mockupType, 
			color: Mockup.color, 
			group: Mockup.mockupGroupID
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

    createMockupVariant = async (Mockup) => {
    	/* adds a style / color variant under an existing mockup group */ 
    	apiUrl = 'https://api.sunfrogshirts.com/v1/mockups/' + this.apiUserProfile + '/addColor.json';
        
        payload = {
        	group: Mockup.mockupGroupID, 
			aiFile: Mockup.aiFile, 
			aiFileBack: Mockup.aiFileBack, 
			imageFile: Mockup.imageFile, 
			imageFileBack: Mockup.imageFileBack, 
			mockupType: Mockup.mockupType, 
			color: Mockup.color
        };

      	response = await this.callAPI(apiUrl, payload);
      	
      	return response; 
    }

    addOrder = async (batchid, email, name, address1, address2, city, state, shippingZipCode, country, memo, orderItems) => {
    	// adds an new order to a batch 
		apiUrl = 'https://api.sunfrogshirts.com/v1/orders/' + this.apiUserProfile + '/addOrder.json';
      	
      	payload = {
      		batchid: batchid,
            email: email,
            name: name,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            shippingZipCode: shippingZipCode,
            country: country,
            memo: memo
      	}
      	
      	i = 1; 

      	orderItems.map((orderItem) => {
      		// iterate over the orderItems array and concatenate the items to the order 
      		thisM = 'm_' + i; 
      		thisSize = 'size_' + i; 
      		thisQty = 'quantity_' + i; 

      		thisItem = {
  				[thisM]: orderItem.mockupID, 
  				[thisSize]: orderItem.size, 
  				[thisQty]: orderItem.quantity 
      		}

      		payload = { ...payload, ...thisItem }
 			i++; 

      	})

		response = await this.callAPI(apiUrl, payload);      	
      	return response; 

    }  
}

export default SunFrogAPI; 