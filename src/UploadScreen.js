import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import firebase from '../config';

const UploadScreen = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        // Check if the user has granted permission to access the media library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        const source = { uri: result.uri };
        console.log(source);
        setImage(source);

    };

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
        var ref = firebase.storeage().ref().child(filename).put(blob);

        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
        Alert.alert("Image uploaded successfully");
        setImage(null);
    };

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image.uri }} style={{width: 300, height: 300}} />}
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )

}

export default UploadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    selectButton: {
        backgroundColor: "#883000",
        borderRadius: 10,
        marginTop: 20,
        height: 55,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        elevation: 7, 
        shadowColor: "grey"
    },
    uploadButton: {
        backgroundColor: "#FD6A02",
        borderRadius: 10,
        marginTop: 20,
        height: 55,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        elevation: 7, 
        shadowColor: "grey"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 10,
        alignItems: "center",
    }
});