import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton({ onPress, color, name, ...rest}) {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={color ? [styles.btnSub, {backgroundColor: color}] : [styles.btnSub]}

        >
            <Text style={styles.btnTxt}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnSub: {
        backgroundColor: '#0275d8',
        width: 250,
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'black',        
    },
    btnTxt: {
        fontSize: 16,
        color: '#f7f7f7',
    }
})