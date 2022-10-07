import React from 'react'
import { 
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

export default function Counter({onSetCount, count}) {

  const fetchHolidays = async () => {
    //https://www.gov.uk/bank-holidays.json
  }
  return (
    <SafeAreaView style={styles.countBar}>
        <Button color='red' title='--' onPress={() => onSetCount(count-1)} ></Button>
        <Text style={{ fontSize: 50 }}>{count}</Text>
        <Button color='red' title='+' onPress={() => onSetCount(count+1)} ></Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  countBar: {
    flexDirection: 'row'
  }
});
