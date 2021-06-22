import React, {useRef} from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./forms/ImageInput";

function ImageInputList({ 
  imageUris = [],
  onImageRemove,
  onImageAdd
 }) {
  
  const scrollView = useRef();
  return (
    <View>
      <ScrollView 
        ref={scrollView} 
        horizontal 
        onContentSizeChange={()=>scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri, i) => (
            <View style={styles.image} key={i}>
              <ImageInput 
                key={uri}
                imageUri={uri} 
                onChange={() => onImageRemove(uri)} 
              />
            </View>
          ))}
          <ImageInput onChange={onImageAdd}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }, 
  image: {
    marginRight: 10
  }
});

export default ImageInputList;