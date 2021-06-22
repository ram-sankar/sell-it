import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import useApi from "../hooks/useApi"
import Card from "../components/Card";
import colors from "../config/colors";
import listingApi from "../api/listings"
import routes from "../navigator/routes"
import Screen from "../components/Screen";
import AppText from "../components/Text";
import AppButton from "../components/Button";

function ListingsScreen({navigation}) {
  const { data: listings, error, loading, request: loadListings} = useApi(listingApi.getListings)
  useEffect(() => {
    loadListings();
  }, [])

  return (
    <Screen style={styles.screen}>
      {error && <> 
        <AppText>Couldn't retrieve the listings</AppText>
        <AppButton title='retry' onPress={loadListings} />
      </>}
      <ActivityIndicator animating={loading} size="large" />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            thumbnailUrl={item.images[0].thumbnailUrl}
            imageUrl={item.images[0].url}
            onPress={()=>navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
