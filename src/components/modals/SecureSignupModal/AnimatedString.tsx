import { useState, useEffect } from "react";

const generateRandomKey = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyFormat = [5, 4, 4, 5];
  let key = "";

  for (const [index, length] of keyFormat.entries()) {
    for (let i = 0; i < length; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (index < keyFormat.length - 1) {
      key += "-";
    }
  }

  return key;
};

const AnimationString = () => {
  const [key, setKey] = useState(generateRandomKey());

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(generateRandomKey());
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return key;
};

export default AnimationString;
