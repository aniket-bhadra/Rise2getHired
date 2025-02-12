import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const CodeEditorScreen = () => {
  const [html, setHtml] = useState(`
    <h1>Hello, World!</h1>
    <button onclick="showMessage()">Click Me</button>
  `);
  const [css, setCss] = useState(`
    body { text-align: center; font-family: Arial; }
    h1 { color: red; }
    button { background: blue; color: white; padding: 10px; border: none; cursor: pointer; }
  `);
  const [js, setJs] = useState(`
    function showMessage() {
      alert('Hello from JavaScript!');
    }
  `);
  const [preview, setPreview] = useState("");

  const generatePreview = () => {
    const code = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setPreview(code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* CodeMirror WebView for HTML */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>HTML</Text>
          <WebView
            style={styles.codeMirror}
            source={{ html: getCodeMirrorHtml("htmlmixed", html) }}
            onMessage={(event) => setHtml(event.nativeEvent.data)}
          />
        </View>

        {/* CodeMirror WebView for CSS */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CSS</Text>
          <WebView
            style={styles.codeMirror}
            source={{ html: getCodeMirrorHtml("css", css) }}
            onMessage={(event) => setCss(event.nativeEvent.data)}
          />
        </View>

        {/* CodeMirror WebView for JavaScript */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>JavaScript</Text>
          <WebView
            style={styles.codeMirror}
            source={{ html: getCodeMirrorHtml("javascript", js) }}
            onMessage={(event) => setJs(event.nativeEvent.data)}
          />
        </View>

        {/* Run Code Button */}
        <TouchableOpacity style={styles.button} onPress={generatePreview}>
          <Text style={styles.buttonText}>Run Code</Text>
        </TouchableOpacity>

        {/* Output Screen */}
        <View style={styles.outputContainer}>
          <Text style={styles.outputLabel}>Output</Text>
          <WebView source={{ html: preview }} style={styles.webview} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to return CodeMirror HTML Template with Dark Theme
const getCodeMirrorHtml = (mode, content) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/theme/monokai.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/htmlmixed/htmlmixed.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/xml/xml.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/javascript/javascript.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/css/css.min.js"></script>
      <style>
        body { margin: 0; background: #272822; color: #fff; }
        .CodeMirror { height: 200px; font-size: 16px; }
      </style>
    </head>
    <body>
      <textarea id="editor">${content}</textarea>
      <script>
        var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
          mode: "${mode}",
          theme: "monokai",
          lineNumbers: true
        });
        editor.on("change", function() {
          window.ReactNativeWebView.postMessage(editor.getValue());
        });
      </script>
    </body>
    </html>
  `;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a2b8a0" },
  scrollView: { padding: 15 },

  inputContainer: { marginBottom: 15 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#116461",
    marginBottom: 5,
  },

  codeMirror: { height: 200 },

  button: {
    backgroundColor: "#e58e40",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  outputContainer: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    height: 400,
  },

  outputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#116461",
    textAlign: "center",
    marginBottom: 5,
  },

  webview: { flex: 1 },
});

export default CodeEditorScreen;
