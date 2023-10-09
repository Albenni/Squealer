import React, { useState, useRef, useEffect } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const numBoxes = 6;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < numBoxes - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (index === numBoxes - 1) {
      const otpValue = newOtp.join("");
      sessionStorage.setItem("OTP", otpValue);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
    const pasteValues = pasteData.split("").slice(0, numBoxes);

    const newOtp = [...otp];
    for (let i = 0; i < numBoxes; i++) {
      if (pasteValues[i]) {
        newOtp[i] = pasteValues[i];
      }
    }

    setOtp(newOtp);
  };

  return (
    <div className="d-flex">
      {Array(numBoxes)
        .fill()
        .map((_, index) => (
          <input
            style={{
              width: "2em",
              height: "2em",
              marginRight: "0.5em",
              textAlign: "center",
              fontSize: "1.5em",
              borderRadius: "0.5em",
            }}
            key={index}
            type="text"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
    </div>
  );
};

export default OtpInput;
