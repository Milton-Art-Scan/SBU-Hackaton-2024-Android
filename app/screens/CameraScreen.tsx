import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Button, Screen, Text } from "app/components";

interface CameraScreenProps extends AppStackScreenProps<"CameraScreen"> {}
 
export const CameraScreen: FC<CameraScreenProps> = observer(function CameraScreen(_props) {
    const { navigation } = _props

    return (
        <Screen preset="fixed" style={{ justifyContent: "center", alignItems: "center" }}>
            <Text preset="heading" text="Take a Picture" />
            <Button title="Simulate Picture Taken" onPress={() => navigation.navigate("Description", {
                title: "The Mona Lisa",
                image: "https://picsum.photos/200/300",
                author: "Leonardo Di Vinci",
                description: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as \"the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world\".",
            })} />
        </Screen>
    )
})