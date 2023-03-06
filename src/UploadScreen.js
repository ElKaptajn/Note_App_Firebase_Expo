import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import React, { useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';

const UploadScreen = () => {
const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    const source = { uri: result.uri };
    setImage(source);
};

const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try{
        await ref;
        setUploading(false);
        Alert.alert('Success', 'Image uploaded');
    } catch(e) {
        console.log(e);
        Alert.alert('Error', 'Something went wrong');
    };
    setImage(null);
};


return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image.uri }} style={{width: 300, height: 200}} />}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
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
        shadowColor: "grey",
        marginLeft: 10,
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
    },
    buttonContainer: {
        flexDirection: "row",
    }
});