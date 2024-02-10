import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { AutoImage, Button, Screen, Text } from "app/components";
import * as Speech from 'expo-speech';

interface DescriptionScreenProps extends AppStackScreenProps<"CameraScreen"> {}
 
export const DescriptionScreen: FC<DescriptionScreenProps> = observer(function DescriptionScreen(_props) {
    const { route, navigation } = _props

    const speak = () => {
        Speech.speak(`${route.params?.title} - by ${route.params?.author}. ${route.params?.description}`)
    }

    useEffect(() => {
        return () => {
            Speech.stop()
        }
    }, [])

    if (!route.params) {
        return (
            <Screen preset="fixed" style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
                <Text preset="heading" style={{ textAlign: "center" }}>
                    Art details will appear here. Take a picture first.
                </Text>
                <Button title="Take Picture" onPress={() => navigation.navigate("Scan")} text="Take a Picture" />
            </Screen>
        )
    }

    return (
        <Screen preset="scroll" safeAreaEdges={["top"]} style={{ marginTop: 50, paddingHorizontal: 10}}>
            <Text preset="heading" style={{ textAlign: "center" }}>
                {route.params?.title}
            </Text>
            <Text preset="default" style={{ textAlign: "center" }}>
                {route.params?.author}
            </Text>
            <AutoImage
                source={{ uri: route.params?.image + "?random=" + Math.round(Math.random()*100)}}
                maxWidth={300}
                style={{ alignSelf: "center", marginVertical: 10 }}
            />

            <Button title="Speak" onPress={speak} text="Read Description" style={{ width: "50%", alignSelf: "center", marginVertical: 10 }} />
            <Text preset="default" style={{ textAlign: "center", marginBottom: 40 }}>
                {route.params?.description}
            </Text>
        </Screen>
    )}
)