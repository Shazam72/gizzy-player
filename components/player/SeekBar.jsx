import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SeekBar() {
    
  return (
    <View style={styles.wrapper}>
      <Text>SeekBar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper:{
        alignItems:"center"
    }
})