import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store, { persistor } from "./store/store.ts";
import App from "./App/App.tsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <App />
    </Provider>
);
