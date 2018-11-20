import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SunFrogAPI from '../src/SunFrogAPI'; 

export default class ClearBatch extends React.Component {

  render() {
    var sfapi = new SunFrogAPI('CC9418BF-0A6E-4C02-B','029EEDE6-A7ED-4587-8');
    sfapi.setUserProfile('3FZXSDFZ8G', 'gvbrown@gmail.com', 'mrbrown');

    sfapi.startBatch()
      .then((response) => {
        sfapi.clearBatch(response[0].BatchID) 
          .then((responseClear) => {
            console.log(responseClear); 
          })
      })
    return (
      <View style={styles.container}>
        <Text>Nothing to see here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
