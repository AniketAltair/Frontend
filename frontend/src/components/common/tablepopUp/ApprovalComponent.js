import React from "react";
import jsQR from "jsqr";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/slice/loadingSlice";
import axios from "axios";

const ApprovalComponent = (key, value, currentData, setCurrentData, action) => {
  const dispatch = useDispatch();

  const canvasElement = React.createRef();
  const verificationTextElement = React.createRef();
  const verifyButtonElement = React.createRef();

  const handleVerifyCode = async (code) => {
    // API to send code to backend for verification.
    console.log("inside handleVerifyCode");
    dispatch(setIsLoading({ isLoading: true }));

    try {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Delay for 2 seconds (adjust the time as per your requirement)
        await delay(2000);
      const response = await axios.get('https://yesno.wtf/api');
      const result = true; // Force it to always return 'true'
      console.log("API response received. Forced Answer:", result);
      dispatch(setIsLoading({ isLoading: false }));
      return result; // Ensure this result is returned correctly
    } catch (error) {
      console.error("Error fetching the API:", error);
      dispatch(setIsLoading({ isLoading: false }));
      return false; // If the API call fails, return false
    }
  };

  const handleVerifyNowClick = async () => {
    const canvas = canvasElement.current;
    const context = canvas.getContext("2d");
    const verificationText = verificationTextElement.current;
    const verifyButton = verifyButtonElement.current;

    try {
      // Request access to the camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      // Set up the camera for 5 seconds
      setTimeout(async () => {
        // Capture the image after 5 seconds
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Stop the camera stream
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());

        // Scan for QR code
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          const codedata = code.data;
          console.log("QR Code Detected:", codedata); // Output the QR code value
          const isVerified = await handleVerifyCode(codedata); // Wait for the result of handleVerifyCode
          console.log("isVerified " + isVerified);

          if (isVerified) {
            verificationText.textContent = "Verified";
            verificationText.style.color = "green";
            verifyButton.style.display = "none"; // Hide the "Verify Now" button
            setCurrentData((prev) => ({ ...prev, [key]: "Verified" }));
          }
        } else {
          console.log("No QR Code found.");
          verificationText.textContent = "QR Code not found";
          verificationText.style.color = "red";
        }
      }, 2000); // Wait for 5 seconds before capturing the image

      verificationText.textContent = "Not Verified";
      verificationText.style.color = "red";
      
    } catch (error) {
      console.error("Error accessing the camera:", error);
      alert("Unable to access the camera. Please check your permissions.");
    }
  };

  return (
    <div>
      {action === "view" ? (
        <span className={`ml-4 break-words ${value === "Verified" ? "text-green-500" : "text-red-500"}`}>
          {value}
        </span>
      ) : (
        <div>
          {value === "Verified" ? (
            <span className="ml-4 text-green-500 break-words">{value}</span>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                ref={verifyButtonElement}
                className="border-2 border-black bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
                onClick={handleVerifyNowClick}
              >
                Verify Now
              </button>
              <span ref={verificationTextElement} className="text-red-500">
                Not Verified
              </span>
            </div>
          )}
          
          {/* Canvas for capturing image (hidden) */}
          <canvas ref={canvasElement} className="hidden" width="640" height="480" />
        </div>
      )}
    </div>
  );
};

export default ApprovalComponent;
