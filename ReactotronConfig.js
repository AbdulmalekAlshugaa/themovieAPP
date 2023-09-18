import Reactotron from "reactotron-react-native"
import { reactotronRedux } from 'reactotron-redux'

Reactotron.configure({ name: 'app' })
    .useReactNative()
    .use(reactotronRedux())
    .connect()
    .createEnhancer()