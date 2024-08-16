import { createContext, useEffect, useState } from "react";

// Define the context type
interface CloudinaryScriptContextType {
  loaded: boolean;
}

// Create a context with a default value
const CloudinaryScriptContext = createContext<
  CloudinaryScriptContextType | undefined
>(undefined);

// Extend the window interface to include cloudinary
declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: {
    cloudName: string;
    uploadPreset: string;
  };
  disabled: boolean;
}

function CloudinaryUploadWidget({
  uwConfig,
  disabled,
}: CloudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [widgetInitialized, setWidgetInitialized] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && window.cloudinary && !widgetInitialized) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      );

      const uploadWidgetButton = document.getElementById("upload_widget");
      if (uploadWidgetButton) {
        uploadWidgetButton.addEventListener(
          "click",
          function () {
            myWidget.open();
          },
          false
        );
      }

      setWidgetInitialized(true); // Ensure the widget is initialized only once
    }
  }, [loaded, widgetInitialized, uwConfig]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className={`py-2 px-4 rounded ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
        }`}
        disabled={disabled}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
