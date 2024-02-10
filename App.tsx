import App from "./app/app"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { Camera } from "expo-camera"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
