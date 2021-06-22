import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native"

import NavigationTheme from "./app/navigator/NavigationTheme";
import AppNavigator from "./app/navigator/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigator/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage"
import { AppLoading } from "expo";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser()
    if(user) setUser(user);
  }

  if(!isReady) return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}/>

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <OfflineNotice />
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator /> }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
