import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg',
    path: Platform.OS === 'android' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DocumentDir,
});

AppRegistry.registerComponent(appName, () => App);
