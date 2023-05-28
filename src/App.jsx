import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "./components/features/store";
import Home from "./components/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools position="bottom-left" initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
