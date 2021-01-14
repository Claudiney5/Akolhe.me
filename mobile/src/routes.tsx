import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import LandingPage from './pages/LandingPage'
import FootholdsMap from './pages/FootholdsMap'
import FootholdDetails from './pages/FootholdDetails'
import WhoWeAre from './pages/WhoWeAre'

import NewFootholdData from './pages/CreateFoothold/NewFootholdData'
import CitySelect from './pages/CreateFoothold/CitySelect'
import SelectedMapPosition from './pages/CreateFoothold/SelectedMapPosition'


import Header from './components/Header'
import WhiteHeader from './components/WhiteHeader'

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ 
                headerShown: false, 
                cardStyle: {
                    backgroundColor: '#f2f3f5'} }}>
            <Screen
                    name="LandingPage" 
                    component={LandingPage} 
                /> 
                <Screen
                    name="FootholdsMap" 
                    component={FootholdsMap} 
                /> 
                <Screen
                    name='FootholdDetails'
                    component={FootholdDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Informações do PA'/>
                    }}
                />
                <Screen
                    name='WhoWeAre'
                    component={WhoWeAre}
                    options={{
                        headerShown: true,
                        header: () => <WhiteHeader title='AkolheMe'/>
                    }}
                />
                <Screen
                    name='CitySelect'
                    component={CitySelect}
                    options={{
                        headerShown: true,
                        header: () => <WhiteHeader title='Cidade do PA2'/>
                    }}
                />
                <Screen
                    name='SelectedMapPosition'
                    component={SelectedMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Confirme posição do PA'/>
                    }}
                />
                <Screen
                    name='NewFootholdData'
                    component={NewFootholdData}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Informações do PA'/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}