import type { AppProps } from "next/app";
import type { NextPage } from "next";

import { AuthProvider } from "contexts/auth-context";
import { EditorProvider } from "contexts/editor-context";

import "../styles/globals.css";
import { ToastProvider } from "contexts/toast-context";
import EditorLayout from "components/layouts/editor-layout";

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    isEditor?: boolean;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  return (
    <ToastProvider autoExpireIn={5000}>
      <AuthProvider>
        <EditorProvider>
          {Component.isEditor ? (
            <EditorLayout>
              <Component {...pageProps} />
            </EditorLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </EditorProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
