import React, { useState, useEffect } from "react";
import annyang from "annyang";

const SpeechToText = () => {
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    if (annyang) {
      annyang.start({
        lang: "ko-KR",
        autoRestart: true,
        continuous: true,
      });

      annyang.addCallback("result", (result) => {
        setTranscription(result[0]);
      });
    }

    return () => {
      annyang.abort();
    };
  }, []);

  return (
    <div>
      <h2>Speak and see the transcription below:</h2>
      <p>{transcription}</p>
    </div>
  );
};

export default SpeechToText;
