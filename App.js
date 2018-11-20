import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SunFrogAPI from './src/SunFrogAPI';
import OrderItem from './src/OrderItem'; 

export default class App extends React.Component {

    /* CREATE SIGNUP EXAMPLE
    API Accouunts require at least one signup (sub account). 

    BEFORE MAKING ANY CALLS - You will need to create at least 
    one signup for your API Account, in order to create a profile 
    for your mockups and orders.

    Signups allow you to provide services for multiple, separate 
    users, under your API account.  An example usage would be if 
    you are providing printing services for multiple stores
    which need to be tracked and handled separately.

    If you are the only user accessing the API, you will still 
    need to create one account to authenticate to the API.  

    This should be the first step, once you have your API keys, 
    as most calls require a profileid, which is returned from the signup 
    call. 
    */

  render() {  
    // set up our API object and auth details

    var sfapi = new SunFrogAPI('CC9418BF-0A6E-4C02-B','029EEDE6-A7ED-4587-8');
    sfapi.setUserProfile('3FZXSDFZ8G', 'gvbrown@gmail.com', 'mrbrown');

    // create a signup
    sfapi.createSignup(
    name = 'Geoff B', 
    email = 'geof2222f@sunfrog22.com', 
    password = '123456', 
    company = 'SunFrog Shirts', 
    address = '123 Some Street', 
    city = 'Gaylord', 
    state = 'MI', 
    zipcode = '49616', 
    country = 'USA') 
    .then((response) => {
        /* Create signup will return the sent username / password, 
        as well as the users profileid.  

        The profileID is used in certain calls to the api.  You will  need
        to include this in your init call to the Sunfrog API class. 
        */ 
        console.log(response); 
    })

    return (
      <View style={styles.container}>
        <Text>Nothing to see here!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
