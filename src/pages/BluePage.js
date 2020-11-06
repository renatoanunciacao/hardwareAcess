import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx'

export default class BluePage extends React.Component {
    constructor(){
        super()
        this.manager = new BleManager()
        this.state = {info: "", values: {}}
    }

    componentDidMount(){
        if(Platform.OS === 'ios'){
            this.manager.onStateChange((state) => {
                if(state === 'PoweredOn') this.scanAndConnect()
            })
        }else{
            this.scanAndConnect()
        }
    }

    error(message) {
        this.setState({info: "ERROR: " + message})
      }
    scanAndConnect(){
        const BLE_DEVICE_NAME = "belkin 808";

        this.manager.startDeviceScan(null, null, (error, device) => {
            console.log("Scanning...")
            console.log(device)

            if(error){
                this.error(error.message)
                return
            }

            if(device.name == BLE_DEVICE_NAME) {
                console.log("CONNECTING TO DEVICE")
                this.manager.stopDeviceScan()
                device.connect()
                .then((device) => {
                    console.log("Discovering services and characteristics")
                    return device.discoverAllServicesAndCharacteristics()
                })
                .then((device) => {
                    console.log("Setting notifications")
                })
                .then(()=> {
                    console.log("Listening...")
                }, (error) => {
                    console.log(error.message)
                });
            }
        });

    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../img/background.png")}
                    style={styles.bgImage}
                    resizeMode="cover">

                    <View style={[styles.section, styles.sectionLarge]}>
                        <Text>BluePage</Text>
                    </View>

                </ImageBackground>
            </View>
        );
    }

    /* async requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
              title: 'Location permission for bluetooth scanning',
              message: 'wahtever',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          ); 
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission for bluetooth scanning granted');
            return true;
          } else {
            console.log('Location permission for bluetooth scanning revoked');
            return false;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20,
    },
    txtPoint: {
        color: 'white',
        fontSize: 80,
    },
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionLarge: {
        flex: 4,
        justifyContent: 'space-around',
    },
});