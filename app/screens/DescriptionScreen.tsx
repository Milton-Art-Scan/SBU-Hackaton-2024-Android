import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { AutoImage, Button, Icon, Screen, Text } from "app/components"
import * as Speech from "expo-speech"
import { useFocusEffect } from "@react-navigation/native"
import { create } from "apisauce"
import FormData from 'form-data';
import { ImageManipulator } from 'react-native';
import { useState } from "react"

const api = create({
  baseURL: "https://aa9f-130-245-220-227.ngrok-free.app",
  timeout: 10000,
})

async function uploadImage(imageUri) {
  const data = new FormData()
  data.append("image", {
    uri: imageUri,
    type: "image/png",
    name: "image.png",
  })

  try {
    console.log("hello")
    const response = await api.post("/api/art/scan/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.ok) {
      console.log("Success")
      console.log(JSON.stringify(response.data))
      return response.data
    } else {
      console.log("Failure")
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

interface DescriptionScreenProps extends AppStackScreenProps<"CameraScreen"> {}

export const DescriptionScreen: FC<DescriptionScreenProps> = observer(function DescriptionScreen(
  _props,
) {
  const { route, navigation } = _props

  const speak = async () => {
    if (await Speech.isSpeakingAsync()) {
      return
    }
    Speech.speak(
      `${route.params?.title} - by ${route.params?.author}. ${route.params?.description}`,
    )
  }

  useEffect(() => {
    if (route.params) {
      route.params.description = null
    }
  }, [])

  useFocusEffect(() => {
    return () => {
      Speech.stop()
    }
  })


  // Picture taken render
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      style={{ marginTop: 50, paddingHorizontal: 10 }}
    >
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
  )
})
