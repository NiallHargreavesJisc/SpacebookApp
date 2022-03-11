import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/Style";
import {Camera} from "expo-camera";
import Image from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedImage";
import {useNavigation} from "@react-navigation/native";


const CameraScreen = () => {

    const navigation = useNavigation();

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                const cameraStatus = await Camera.requestCameraPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');
            } catch (e) {
                console.log("Camera: " + e)
            }
        })();
    }, []);

    const takePicture = async () => {
        if(camera){
            const options = {
                quality: 0.5,
                base64: true,
            };
            const data = await camera.takePictureAsync(options)
             setImage(data.uri);
             setImageData(data);
        }
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const uploadPicture = async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');
        console.log(image)
        let res = await fetch(imageData.base64);
        let blob = await res.blob();
        console.log("RES:",res);
        console.log("Blob",blob);

        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/photo", {
            method: 'post',
            headers: {
                "Content-Type": "image/jpeg",
                "X-Authorization": authToken
            },
            body: blob
        })
            .then((response) => {
                if (response.status === 200) {
                    navigation.navigate("Profile", {profileId: userId});
                } else if (response.status === 401) {
                    console.log("Could not upload photo")
                } else {
                    throw 'Something went wrong';
                }
            }).then(

            )
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <View style={{ flex: 1}}>
            <View style={styles.camera}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'} />
            </View>
            <Button
                title="Flip Image"
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }} />
            <Button title="Take Picture" onPress={() => takePicture()} />
            {image &&
                <View style={{flex:1}}>
                    <Image source={{uri: image}} style={{flex:0.8}} />
                    <Button title={"Upload"} onPress={() => uploadPicture()} style={{flex:0.2, justifyContent: "flex-end"}}/>
                </View>
            }

        </View>
    )

}

export default CameraScreen