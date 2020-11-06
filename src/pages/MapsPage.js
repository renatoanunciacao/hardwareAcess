import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, PermissionsAndroid,Alert } from 'react-native'; 
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
export default class MapsPage extends React.Component{

    constructor(props){
        super(props)
            this.state = {
                position: {
                    latitude: -29.973907,
                    longitude: -51.194862,
                    latitudeDelta: 0.10,
                    longitudeDelta: 0.02,
                }
            }
        
    }

    componentDidMount(){
        if(Platform.OS === 'ios'){
            Geolocation.requestAuthorization('always')
        }else{
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permissão de Localização',
                    message: 'A aplicação precisa de permissão de localização.'
                }
            )
        }
    }

    setCurrentPosition(){
        let getPosition = true;

        if(Platform.OS === 'android'){
            if("granted" === PermissionsAndroid.RESULTS.GRANTED){
                getPosition = true
            }else{
                getPosition = false
                Alert.alert('Permissão de localização não concedida')
            }
        }
        if(getPosition)
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = positions.coords
                this.setState({
                    position: {
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.02,
                    }
                });
            },
            error => {
                console.log(error.code, error.message)
            },
            {enableHighAccuracy: true, timeout:15000, maximumAge: 10000},
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.position}>
                        <Marker
                            coordinate={this.state.position}
                            title={'Marker'}
                            description={'Novo marcador no mapa'} />
                    </MapView>

                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>Sua Localização</Text>
                        <View style={styles.bocLatLon}>
                            <Text style={{fontSize: 16}}>Latitude</Text>
                            <Text style={{fontSize: 16}}>{this.state.position.latitude} </Text>
                        </View>
                        <View style={styles.boxLatLon}>
                            <Text style={{fontSize: 16}}> Longitude</Text>
                            <Text style={{fontSize: 16}}> {this.state.position.longitude}</Text>
                        </View>
                    </View>
                        <TouchableOpacity style={styles.button} onPress={ () => { this.setCurrentPosition() }}>
                            <Icon name="my-location" color={'#fff'} size={30} />
                        </TouchableOpacity>
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map:{
        height: '100%',
        width: '100%',
    },
    box:{
        backgroundColor: '#e74c3c',
        borderRadius: 20,
        opacity: 0.75,
        marginTop: -170,
        marginHorizontal: 40,
        padding: 25,
        shadowColor: '#000',
        elevation: 5,
    },
    boxLatLon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        backgroundColor: '#e74c3c',
        borderRadius: 150,
        marginTop: -25,
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 8,
    },
});