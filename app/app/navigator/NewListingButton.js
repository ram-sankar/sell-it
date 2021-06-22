import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';

function NewListingButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View >
        <MaterialCommunityIcons name="plus-circle" size={40} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
    borderWidth: 10,
    borderColor: colors.white,
    bottom: 30,
    height: 80,
    justifyContent: 'center',
    width: 80
  }
})

export default NewListingButton;