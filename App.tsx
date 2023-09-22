import AppNavigation from './app/navigation/appNavigation';
import { store } from './app/store'
import { Provider } from 'react-redux'
import("./ReactotronConfig").then(() => console.log("Reactotron Configured"))
import { PaperProvider } from 'react-native-paper';
export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </Provider>

  );
}
