import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { AutoImage, Button, Icon, Screen, Text } from "app/components";
import { Image } from "react-native";


const TutorialImage1 = require("../../assets/images/tutorial1.png")
const TutorialImage2 = require("../../assets/images/tutorial2.png")
const TutorialImage3 = require("../../assets/images/tutorial3.png")


interface TutorialScreenProps extends AppStackScreenProps<"CameraScreen"> {}
 
export const TutorialScreen: FC<TutorialScreenProps> = observer(function TutorialScreen(_props) {
    return (
        <Screen preset="scroll"  safeAreaEdges={["top"]} style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
            <Text preset="heading" style={{ textAlign: "center", fontSize: 45,paddingTop: 50 }}>
                Milton
            </Text>

            <Text preset="default" style={{ textAlign: "center", marginTop: 100 }}>
                Named after 17th century poet John Milton, Milton is an app that helps you learn about art.
                {"\n"}
                Much of Miltons's work was written in completely in the dark, as he lost his sight in his 40s.
                Yet in his blindness, his work grew more vivid and imaginative.
                His magnum opus, Paradise Lost, is a testament to the power of art to transcend the physical world.
                {"\n\n"}
                Milton is designed to help you experience art in a new way, by providing audio descriptions of art pieces.
                All you need to do is scan a piece of art, and Milton will provide you with information about the art and an audio description if desired.
            </Text>
            <Icon icon="down" size={30} style={{ alignSelf: "center", marginTop: 10, marginBottom: 50 }} />
            <Text preset="heading" style={{ textAlign: "center" }}>
                Step 1. Scan
            </Text>
            <AutoImage
                source={{ uri: Image.resolveAssetSource(TutorialImage1).uri }}
                maxWidth={350}
                style={{ alignSelf: "center", marginVertical: 10 }}
            />
            <Text preset="default" style={{ textAlign: "center", marginBottom: 50 }}>
                Use your camera to scan a piece of art.
            </Text>
            
            <Text preset="heading" style={{ textAlign: "center" }}>
                Step 2. Get Info
            </Text>
            <AutoImage
                source={{ uri: Image.resolveAssetSource(TutorialImage2).uri }}
                maxWidth={350}
                style={{ alignSelf: "center", marginVertical: 10 }}
            />
            <Text preset="default" style={{ textAlign: "center", marginBottom: 50 }}>
                Learn about the art you scanned. 
            </Text>

            <Text preset="heading" style={{ textAlign: "center" }}>
                Step 3. Listen
            </Text>
            <AutoImage
                source={{ uri: Image.resolveAssetSource(TutorialImage3).uri }}
                maxWidth={350}
                style={{ alignSelf: "center", marginVertical: 10 }}
            />
            <Text preset="default" style={{ textAlign: "center", marginBottom: 50 }}>
                Click the speaker icon to listen to the description of the art.
            </Text>

            <Button preset="default" text="Get Started" onPress={() => _props.navigation.navigate("Scan")}
                style={{
                    marginBottom: 200,
                    width: "50%",
                    alignSelf: "center",
                }}
            >
                Get Started
            </Button>
        </Screen>
    )
})