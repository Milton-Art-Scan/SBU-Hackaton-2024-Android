import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { AutoImage, Button, Icon, Screen, Text } from "app/components";
import * as Speech from 'expo-speech';
import { useFocusEffect } from "@react-navigation/native";

interface DescriptionScreenProps extends AppStackScreenProps<"CameraScreen"> {}
 
export const DescriptionScreen: FC<DescriptionScreenProps> = observer(function DescriptionScreen(_props) {
    const { route, navigation } = _props

    const speak = async () => {
        if (await Speech.isSpeakingAsync()) {
            return
        }
        Speech.speak(`${route.params?.title} - by ${route.params?.author}. ${route.params?.description}`)
    }

    useEffect(() => {
        if (route.params) {
            route.params.description = null;
        }

    }, [])

    useFocusEffect(() => {
        return () => {
            Speech.stop()
        }
    })

    // Default no picture taken render
    if (!route?.params?.description) {
        return (
            <Screen preset="fixed" style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
                <Text preset="heading" style={{ textAlign: "center" }}>
                    No Picture Taken
                </Text>
                <Button title="Take Picture" onPress={() => navigation.navigate("Scan")} text="Take a Picture" />
            </Screen>
        )
    }
    
    // Picture taken render
    return (
        <Screen preset="scroll" safeAreaEdges={["top"]} style={{ marginTop: 50, paddingHorizontal: 10}}>
            <Text preset="heading" style={{ textAlign: "center" }}>
                {route.params?.title}
            </Text>
            <Text preset="default" style={{ textAlign: "center" }}>
                {route.params?.author}
            </Text>
            <AutoImage
                source={{ uri: route.params?.image }}
                maxWidth={300}
                style={{ alignSelf: "center", marginVertical: 10, borderRadius: 10 }}
            />
            <Icon icon="volumeUp" size={30} onPress={speak} style={{ alignSelf: "center" }} />
            <Text preset="default" style={{ textAlign: "center", marginBottom: 40 }}>
                {route.params?.description}
            </Text>
        </Screen>
    )}
)