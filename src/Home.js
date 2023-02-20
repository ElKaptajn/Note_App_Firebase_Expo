import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { FlashList } from "@shopify/flash-list";
import { Entypo } from "@expo/vector-icons";

const Home = () => {

    const [notes, setNotes] = useState([])
    const navigation = useNavigation();

    // Fetch the data from firestore
    useEffect(() => {
        firebase.firestore()
        .collection("notes")
        .onSnapshot((querySnapshot) => {
            const newNotes = [];
            querySnapshot.forEach((doc) => {
                const {note, title} = doc.data();
                newNotes.push({note, title, id: doc.id});
            });
            setNotes(newNotes);
        });
    }, [])
    return (
        <View style={styles.container}>
            <FlashList
                data={notes}
                numColumns={2}
                estimatedItemSize={100}
                renderItem={ ({item}) => (
                    <View style={styles.noteView}>
                        <Pressable
                            onPress= { () => navigation.navigate("Detail", {item} )}
                        >
                            <Text style={styles.noteTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.noteDescription}>
                            {
                            item.note.length > 40
                            ? `${item.note.substring(0, 40)}...`
                            : item.note
                            }
                            </Text>
                        </Pressable>
                    </View>
                )}
            />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("NoteAdd")}
                >
                    <Entypo
                        name="plus" size={65} color="white"
                    />
                </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    noteView: {
        flex: 1,
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width:0, height: 2},
        shadowRadius: 2,
        elevation: 7,
        alignItems: "center",
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    noteDescription: {
        fontSize: 16, 
        marginTop: 5
    },
    button: {
        position: "absolute",
        bottom: 60,
        right: 30,
        backgroundColor: "orange",
        borderRadius: 50,
        elevation: 7,
    }
})