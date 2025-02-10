import { Box, Heading, Image, Button, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import phaedraBg from "./assets/phaedra-bg.jpg";
import phaedra1 from "./assets/phaedra.png";
import phaedra2 from "./assets/phaedra2.png";
import phaedra3 from "./assets/phaedra3.png";
import phaedra4 from "./assets/phaedra4.png";

const theme = extendTheme({});
const MotionBox = motion(Box);
const MotionImage = motion(Image);

const pearls = [
  { id: 1, image: phaedra1, text: "The ocean whispers secrets, and so do your eyes." },
  { id: 2, image: phaedra2, text: "You move like the tide—graceful, powerful, unstoppable." },
  { id: 3, image: phaedra3, text: "Like the moon pulls the waves, you pull me closer." }
];

const Phaedra = () => {
  const [collectedPearls, setCollectedPearls] = useState([]);
  const [showFinalReflection, setShowFinalReflection] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [activePearl, setActivePearl] = useState(null);
  const [showCenterPearl, setShowCenterPearl] = useState(null);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(false), 4000);
    return () => clearTimeout(titleTimer);
  }, []);

  useEffect(() => {
    if (!showFinalReflection && collectedPearls.length < 3) {
      const randomPearl = pearls.find(p => !collectedPearls.includes(p));
      setActivePearl(randomPearl);
    }
  }, [collectedPearls, showFinalReflection]);

  const collectPearl = () => {
    if (activePearl) {
      setCollectedPearls([...collectedPearls, activePearl]);
      setShowCenterPearl(activePearl);
      setActivePearl(null);

      setTimeout(() => {
        setShowCenterPearl(null); // Pearl fades out after 2 seconds
      }, 2000);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgImage={`url(${phaedraBg})`}
        bgSize="cover"
        bgPosition="center"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        textAlign="center"
      >
        {/* Floating Title (Disappears After 4s) */}
        {showTitle && (
          <MotionBox
            bg="rgba(0, 0, 0, 0.6)"
            p={4}
            borderRadius="md"
            boxShadow="xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Heading color="white" fontSize="5xl" textShadow="0px 0px 15px rgba(255, 255, 255, 0.9)">
              Find the hidden pearls, Phaedra 🦪
            </Heading>
          </MotionBox>
        )}

        {/* Floating Pearl for Collection */}
        {!showFinalReflection && activePearl && (
          <MotionBox
            position="absolute"
            top={`${Math.random() * 60 + 20}%`}
            left={`${Math.random() * 80 + 10}%`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            cursor="pointer"
            onClick={collectPearl}
          >
            <Heading fontSize="4xl" color="white" textShadow="0px 0px 15px rgba(255, 255, 255, 1)">
              🦪 {/* Pearl icon */}
            </Heading>
          </MotionBox>
        )}

        {/* Center Display Pearl - Fades In and Out */}
        <AnimatePresence>
          {showCenterPearl && (
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <MotionImage
                src={showCenterPearl.image}
                borderRadius="lg"
                boxShadow="0px 0px 20px rgba(255, 255, 255, 0.8)"
              />
            </MotionBox>
          )}
        </AnimatePresence>

        {collectedPearls.length === 3 && !showFinalReflection && (
          <Button size="lg" marginTop="150px" colorScheme="blue" onClick={() => setShowFinalReflection(true)}>
            Look into the moonlit water 🌊
          </Button>
        )}

        <AnimatePresence>
          {showFinalReflection && (
            <MotionBox
              mt={6}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              bg="rgba(0, 0, 0, 0.6)"
              p={6}
              borderRadius="md"
              boxShadow="xl"
              maxW="600px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <MotionImage
                src={phaedra4} // Final image remains in the center
                borderRadius="lg"
                maxH="500px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
              <Heading fontSize="2xl" color="white" mt={4} textShadow="0px 0px 15px rgba(255, 255, 255, 0.9)">
              The ocean has revealed its most precious treasure... and damn, Phaedra, it's dangerously hot. 🔥
              </Heading>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </ChakraProvider>
  );
};

export default Phaedra;
