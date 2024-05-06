import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { CheckBox, Input, Button, Icon, Card } from "react-native-elements"
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Loading from "../components/LoadingComponent";
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
    const [startCity, setStartCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [resultString, setResultString] = useState('');
    const [remember, setRemember] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showMain, setShowMain] = useState(true);

    const fetchResults = async () => {
        if (remember) {
            SecureStore.setItemAsync(
                'tripinfo',
                JSON.stringify({
                    startCity,
                    destinationCity
                })
            ).catch((error) => console.log('Could not save trip info.', error));
        } else {
            SecureStore.deleteItemAsync('tripinfo').catch((error) => console.log('Could not delete trip info.', error))
        }

        const apiKey = "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";

        // ChatGPT API endpoint
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        // Set up the headers with the API key
        const apiHeaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };

        // Construct the prompt
        const apiPrompt = `I'm taking a roadtrip from ${startCity} to ${destinationCity}. In a numbered list of 5 options, with only one sentence describing each, what stops might I make along the way? Put the stops in a sensible order for me to drive them in order.`

        // Set up the data with the prompt
        const apiData = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a travel agent." },
                { role: "user", content: apiPrompt },
            ],
        };

        try {
            setShowMain(false);
            setShowLoading(true);
            setShowResults(false);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify(apiData),
            })
            const json = await response.json();
            let jsonResult = '';
            jsonResult = json.choices[0].message.content;
            jsonResult = jsonResult.replaceAll("\n", "\n\n");
            setResultString('');
            setResultString(jsonResult);
            // setResultString(json.choices[0].message.content);
            // const resultArr = resultString.split("\n");
            // setResultString(resultArr);

            console.log("2: " + JSON.stringify(json));
            console.log("jsonResult: " + jsonResult);
            console.log("resultString: " + resultString);

            setShowLoading(false);
            setShowResults(true);
            return json;
        } catch (error) {
            setShowMain(true);
            setShowLoading(false);
            setShowResults(false);

            console.error(error);
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync('tripinfo').then((tripdata) => {
            const tripinfo = JSON.parse(tripdata);
            if (tripinfo) {
                setStartCity(tripinfo.startCity);
                setDestinationCity(tripinfo.destinationCity);
                setRemember(true);
            }
        });
    }, []);

    // const handleLogin = () => {
    //     console.log('username:', username);
    //     console.log('password:', password);
    //     console.log('remember:', remember);
    //     if (remember) {
    //         SecureStore.setItemAsync(
    //             'userinfo',
    //             JSON.stringify({
    //                 username,
    //                 password
    //             })
    //         ).catch((error) => console.log('Could not save user info', error));
    //     } else {
    //         SecureStore.deleteItemAsync('userinfo').catch((error) =>
    //             console.log('Could not delete user info', error)
    //         );
    //     }
    // };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        });

    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder='Starting Location'
                    leftIcon={{ type: 'material-community', name: 'numeric-1' }}
                    onChangeText={(text) => setStartCity(text)}
                    value={startCity}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='End Destination'
                    leftIcon={{ type: 'material-community', name: 'numeric-2' }}
                    onChangeText={(text) => setDestinationCity(text)}
                    value={destinationCity}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Inputs'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => fetchResults()}
                        title='Submit'
                        color='#5637DD'
                        icon={
                            <Icon
                                name='search'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
                {showMain ? (
                    <Text style={styles.textMain}>Swipe right from the left of the screen or select the home icon to view the menu.</Text>
                ) : null}
                {showLoading ? (
                    <Card wrapperStyle={{ margin: 10 }}>
                        <Card.Title style={styles.cardTitle}>
                            Results
                        </Card.Title>
                        <Card.Divider />
                        <Loading />
                    </Card>
                ) : null}
                {showResults ? (
                    <Card wrapperStyle={{ margin: 10 }}>
                        <Card.Title style={styles.cardTitle}>
                            Results
                        </Card.Title>
                        <Card.Divider />
                        <Text style={styles.cardBody}>{resultString}</Text>
                    </Card>
                ) : null}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    textMain: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'semibold',
        fontSize: 18,
        margin: 15
    },
    cardTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5
    },
    cardBody: {
        fontWeight: 'normal',
        fontSize: 14
    }
});

export default HomeScreen;