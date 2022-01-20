import type { AppProps } from "next/app";

import { AuthProvider } from "contexts/auth-context";
import { EditorProvider } from "contexts/editor-context";

import "../styles/globals.css";
import { ToastProvider } from "contexts/toast-context";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ToastProvider autoExpireIn={5000}>
      <AuthProvider>
        <EditorProvider>
          <Component {...pageProps} />
        </EditorProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
