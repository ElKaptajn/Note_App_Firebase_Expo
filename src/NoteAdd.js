import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase } from "../config"
import { Keyboard } from "react-native";
import UploadScreen from './UploadScreen';

const NoteAdd = () => {

    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const newNoteCreated = new Date();

    const handleAdd = () => {
        firebase.firestore()
        .collection("notes")
        .add({
            title, note, noteCreated: newNoteCreated
        })
        .then(() => {
            setTitle("");
            setNote("");
            Keyboard.dismiss(); //Removes the keyboard after...
        })
        .catch((error) => {
            alert(error);
        });
    }

    const handlePress = () => {
        handleAdd();
        uploadImage();
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder= "Title..."
                placeholderTextColor="white"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.inputTitle}
            />
            <TextInput
                placeholder= "Note..."
                placeholderTextColor="white"
                placeholderStyle={{ fontStyle: 'italic' }}
                value={note}
                onChangeText={(text) => setNote(text)}
                style={styles.inputNote}
                multiline={true}
            />
            <UploadScreen/>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
};

export default NoteAdd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
    },
    inputTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        width: "97%",
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
    },
    inputNote: {
        color: "white",
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
        height: 200,
        width: "97%",
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
    },
    button: {
        backgroundColor: "orange",
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
        fontSize: 22,
        fontWeight: "bold"
    }
})