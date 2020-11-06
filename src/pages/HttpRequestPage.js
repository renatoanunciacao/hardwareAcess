import React from 'react';
import { StyleSheet, View,  Text, FlatList } from 'react-native';
import axios from "axios";
import {Card} from "@paraboly/react-native-card";
import { Linking } from "react-native";

export default class HttpRequestPage extends React.Component {
   constructor(props){
       super(props)
       this.state = {
           people: null
       }
   }

   componentDidMount(){
       axios.get(`https://jsonplaceholder.typicode.com/users`)
       .then(res => {
           console.log(res.data)
           const people = res.data
           this.setState({people})
       })
   }
    render(){
        return (
            <View>
                <FlatList
                    data={this.state.people}
                    keyExtractor={item => item.id.toString() }
                    renderItem={({item}) => (
                        <Card 
                            style={styles.card}
                            iconDisable
                            title={item.name}
                            content={item.email}
                            bottomRigthText={item.phone}
                            onPress={ () => {Linking.openURL(`tel: ${item.phone}`)}}/>
                    )}/>
                
             </View>
        )
    }
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
    card: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    }
})