import { Box, Heading, Text, Button, ChakraProvider, extendTheme, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import katerinaBg from "./assets/katerina-bg.jpg"; // Background image
import kateImage from "./assets/kate.png"; // Katerina image
import kate2Image from "./assets/kate2.png";
import kate3Image from "./assets/kate3.png";
import kate4Image from "./assets/kate4.png";

const theme = extendTheme({});
const MotionBox = motion(Box);

const fallingStars = Array.from({ length: 50 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100 + "%",
  animationDuration: Math.random() * 3 + 2 + "s",
  animationDelay: Math.random() * 2 + "s",
}));

const messages = [
  "Even though I barely know you,",
  "You already are one of the brightest stars in my life.",
  "I love it when we dance together,",
  "I don't mind if you suck at Latin. 💖",
  "You have a special place in my heart already,",
  "and in my bedroom 😏."
];

const kateImages = [kateImage, kate2Image, kate3Image, kate4Image];

const Katerina = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showImages, setShowImages] = useState(true);

  useEffect(() => {
    setShowButton(false);
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, [messageIndex]);

  useEffect(() => {
    const imageTimer = setTimeout(() => setShowImages(false), 6000);
    return () => clearTimeout(imageTimer);
  }, []);

  const triggerFireworks = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      angle: 90,
      origin: { x: 0.5, y: 0.7 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 150,
        angle: 180,
        origin: { x: 0.7, y: 0.4 },
      });
    }, 500);
  };

  const nextMessage = () => {
    if (messageIndex === messages.length - 1) {
      setShowFinalMessage(true);
      triggerFireworks();
    } else {
      setMessageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const resetScreen = () => {
    setShowFinalMessage(false);
    setMessageIndex(0);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgImage={`url(${katerinaBg})`}
        bgSize="cover"
        bgPosition="center"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        textAlign="center"
      >
        {/* Floating Images Effect Before Carousel Appears */}
        {showImages &&
          Array.from({ length: 50 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 100 }}
              transition={{ duration: 1.5, delay: index * 0.5 }}
              style={{
                position: "absolute",
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <Image src={kateImages[index % kateImages.length]} boxSize="100px" borderRadius="full" opacity={0.8} />
            </motion.div>
          ))}

        {/* Falling Stars */}
        {!showImages &&
          fallingStars.map((star) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: "100vh", rotate: [0, 10, -10, 0] }}
              transition={{ duration: parseFloat(star.animationDuration), delay: parseFloat(star.animationDelay), repeat: Infinity }}
              style={{
                position: "absolute",
                top: 0,
                left: star.left,
                fontSize: "20px",
                color: "gold",
              }}
            >
              ✨
            </motion.div>
          ))}

        {!showImages && (
          showFinalMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ background: "rgba(0, 0, 0, 0.8)", padding: "50px", borderRadius: "10px", boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.9)" }}
            >
              <Heading color="white" fontSize="5xl" textShadow="0px 0px 15px rgba(255, 100, 100, 1)">
              You make my world a little hotter, and my heart a lot warmer.🔥
              </Heading>
              <Button mt={6} colorScheme="red" size="lg" onClick={resetScreen}>
                Restart
              </Button>
            </motion.div>
          ) : (
            <Box bg="rgba(0, 0, 0, 0.4)" p={8} borderRadius="lg" boxShadow="xl" maxW="600px">
              <Heading 
                color="white" 
                fontSize="4xl" 
                textShadow="0px 0px 15px rgba(255, 255, 255, 0.9)"
                mb={4}
              >
                Happy Valentine’s, Mamacita Buena 💖
              </Heading>
              <AnimatePresence mode="wait">
  <motion.div
    key={messageIndex}
    initial={{
      opacity: 0,
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      scale: 0.5,
    }}
    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: Math.random() * 200 - 100, y: Math.random() * 200 - 100, scale: 0.5 }}
    transition={{ duration: 1, ease: "easeInOut" }}
  >
    <Text fontSize="2xl" color="white" fontWeight="bold" p={4}>
      {messages[messageIndex]}
    </Text>
  </motion.div>
</AnimatePresence>

              {showButton && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <Button mt={4} colorScheme="yellow" size="lg" onClick={nextMessage}>
                    Next ➡️
                  </Button>
                </motion.div>
              )}
            </Box>
          )
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Katerina;
