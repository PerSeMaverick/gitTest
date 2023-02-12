// function timer(time) {
//   return new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve(time);
//     }, time);
//   });
// }
// /*
// console.log('start')
// timer(1000).then(function(time){
//     console.log('time: '+time);
//     return timer(time+1000);
// }).then(function(time){
//     console.log('time: '+time);
//     return timer(time+1000);
// }).then(function(time){
//     console.log('time: '+time);
//     console.log('end');
// */
// async function run() {
//   console.log("start");
//   let time = await timer(1000);
//   console.log("timer: " + time);
//   time = await timer(time + 1000);
//   console.log("timer: " + time);
//   time = await timer(time + 1000);
//   console.log("timer: " + time);
//   console.log("end");
// }

// async function run2() {
//   console.log("parent start");
//   await run();
//   console.log("parent end");
// }

// // console.log(run());

// console.log("parent parent start");
// run2().then(function () {
//   console.log("parent parent end");
// });

import React, { useState, useEffect } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

function App() {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setTranscript(transcript);
    });

    recognition.addEventListener("end", recognition.start);

    recognition.start();

    return () => {
      recognition.removeEventListener("result", () => {});
      recognition.removeEventListener("end", () => {});
    };
  }, []);

  return (
    <div className="words">
      <p>{transcript}</p>
    </div>
  );
}

export default App;
