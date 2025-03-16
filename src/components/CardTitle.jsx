import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const texts = [
  "SOX Compliance",
  "CPRA",
  "Segregation of Duties",
  "Financial Controls",
  "SOX Audit Best Practices",
];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={texts[index]}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
    >
      {texts[index]}
    </motion.div>
  );
}
