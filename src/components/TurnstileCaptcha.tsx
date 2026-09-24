import React, { useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const SITE_KEY = '1x00000000000000000000AA'; // Cloudflare dummy key (always passes)

const HTML_CONTENT = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: transparent;
    }
  </style>
</head>
<body>
  <div class="cf-turnstile" data-sitekey="${SITE_KEY}" data-callback="onSuccess"></div>
  <script>
    function onSuccess(token) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'success', token }));
      } else {
        window.parent.postMessage({ type: 'success', token }, '*');
      }
    }
  </script>
</body>
</html>
`;

export default function TurnstileCaptcha({ onVerify }: { onVerify: (token: string) => void }) {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handler = (event: MessageEvent) => {
        if (event.data && event.data.type === 'success') {
          onVerify(event.data.token);
        }
      };
      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }
  }, [onVerify]);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {/* @ts-ignore - iframe is not natively supported in types for React Native */}
        <iframe
          srcDoc={HTML_CONTENT}
          style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent' }}
          scrolling="no"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: HTML_CONTENT }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'success') {
              onVerify(data.token);
            }
          } catch (e) {
            // ignore
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 65,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 4,
  }
});
