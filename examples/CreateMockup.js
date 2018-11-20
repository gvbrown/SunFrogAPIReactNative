import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SunFrogAPI from '../src/SunFrogAPI';
import Mockup from '../src/Mockup'; 

export default class CreateMockup extends React.Component {

  render() {  
    // set up our API object and auth details
    var sfapi = new SunFrogAPI('CC9418BF-0A6E-4C02-B','029EEDE6-A7ED-4587-8');
    sfapi.setUserProfile('3FZXSDFZ8G', 'gvbrown@gmail.com', 'mrbrown');

    /*  CREATE MOCKUP EXAMPLE 
      
      "Mockups" represent a product variant, and are organized in groups.  

      A group of mockups share the same common artwork, but will be applied to 
      different product types, styles and colors.  

      A group is created by calling the createMockup() method.  This returns the groupid 
      for that group, as well as a mockupid (m) for the initial variant.  

      A variation for a group is created by calling createMockupVariant(), which requires
      the groupid for the original group, and will return a mockupid (m), which is used 
      when placing orders.  

    */ 

    // for simplicity, we create an array of Mockup Objects    
    var mockupArray = [];

    // create the Mockup Object
    var mockup = new Mockup('', 
                'red',
                '8',
                'https://api.sunfrogshirts.com/sunfrogshirt.jpg',
                'https://api.sunfrogshirts.com/sunfroglogo.png',
                '',
                '')
    
    // get the current length of the array
    arrayLen = mockupArray.push(mockup); 

    // call createMockup
    sfapi.createMockup(mockupArray[arrayLen-1]). 
      then((response) => { 
        /* 
        ** Create Mockup Response ** 

        GROUP & M PARAMETERS
        The GROUP parameter is useful for creating variations based on a design.  
        Variants are created as a child of the group. 

        The M parameter is a reference to the created variant, which is used 
        when creating orders. Whenever possible, store these values in relation
        to your own designs and variants, as they can be reused in subsequent 
        orders for the same design and style. 

        CREATING VARIANTS 
        To create variants, we reference the groupid from the response, 
        and add different type and color options.  

        Colors and types can be passed as numeric values or strings.  The 
        supported options vary by account.  Review the documentation 
        for a list of supported products, sizes and colors for you 
        API account.  

        */ 
        // get the value of the groupid for the initial product
        newGroup = response[0].Group;

        // create another Mockup Object and add it to the Mockups array
        var mockup = new Mockup(
              newGroup, 
              'black',
              '8',
              'https://api.sunfrogshirts.com/sunfrogshirt.jpg',
              'https://api.sunfrogshirts.com/sunfroglogo.png',
              '',
              '')  
        arrayLen = mockupArray.push(mockup); 
        console.log(mockupArray[arrayLen-1]); 
        // create a variant for the initial group 
        sfapi.createMockupVariant(mockupArray[arrayLen-1]). 
          then((response) => {
              /* 
                Add Color Response 
                Similar to the addMockup response, the addColor endpoint will return the parameter "m", which 
                is used to reference this particular variant in the future. 

              */
            console.log(response); 
          })
      });


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
