import { View, Image, StyleSheet } from 'react-native'
import React from 'react'


const GIF_ANIMATION = require('../assets/wastewiz_loading.gif')

const Loading = () => {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: "white" },
            ]}
        >
            <Image
                source={GIF_ANIMATION}
                resizeMode="contain"
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '80%',
        height: '80%',
    },
})

export default Loading