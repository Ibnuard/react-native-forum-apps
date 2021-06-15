/**
 * @format
 */

import * as React from 'react'
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper'
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

export default function Main() {
    LogBox.ignoreAllLogs(true)
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    );
}
AppRegistry.registerComponent(appName, () => Main);
