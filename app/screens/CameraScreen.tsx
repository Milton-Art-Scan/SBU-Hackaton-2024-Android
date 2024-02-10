import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Button, Icon, Screen, Text } from "app/components"
import { Camera, CameraType } from "expo-camera"
import { TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

interface CameraScreenProps extends AppStackScreenProps<"CameraScreen"> {}

export const CameraScreen: FC<CameraScreenProps> = observer(function CameraScreen(_props) {
  const { navigation } = _props
  const [permission, askPermission] = Camera.useCameraPermissions()
  const [type, setType] = useState(CameraType.back)
  const [focus, setFocus] = useState(false)
  const cameraRef = React.useRef<Camera>(null)
  useFocusEffect(() => {
    setFocus(true)
    return () => {
        setFocus(false)
    }
  })

  if (!permission) {
    const { status } = Camera.requestCameraPermissionsAsync()

    return (
      <Screen preset="fixed" style={{ justifyContent: "center", alignItems: "center" }}>
        <Text preset="heading" text="Requesting Camera Permission" />
        <Button title="Request Permission" onPress={askPermission} />
      </Screen>
    )
  }

  return (
    <Screen preset="fixed">
      {focus && <Camera ref={cameraRef} style={{ width: "100%", height: "100%"}} ratio="16:9" type={type}>
        <View style={{ alignItems: "center", height: "100%", justifyContent: "flex-end"}}>
          <Icon
            icon="circle"
            size={85}
            onPress={() => {
                cameraRef.current?.takePictureAsync({ onPictureSaved: (photo) => {
                    console.log(photo)
                }})
            }} 
          />
        </View>
      </Camera>}
    </Screen>
  )
})

// {/* <Screen preset="fixed" style={{ justifyContent: "center", alignItems: "center" }}>
//             <Text preset="heading" text="Take a Picture" />
//             <Button title="Simulate Picture Taken" onPress={() => navigation.navigate("Description", {
//                 title: "The Mona Lisa",
//                 image: "https://picsum.photos/200/300",
//                 author: "Leonardo Di Vinci",
//                 description: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as \"the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world\".",
//             })} />
//         </Screen> */}
