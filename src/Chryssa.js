import { Box, Heading, Image, Button, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import chryssaBg from "./assets/chryssa-bg.jpg";
import chryssaCard1 from "./assets/chryssa4.png";
import chryssaCard2 from "./assets/chryssa2.png";
import chryssaCard3 from "./assets/chryssa3.png";
import chryssaFinalCard from "./assets/chryssa.png";

const theme = extendTheme({});

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const cards = [
  { id: 1, image: chryssaCard1, text: "You’re as charming as a dream, and I’m so lucky to know you!" },
  { id: 2, image: chryssaCard2, text: "Your smile can light up even the darkest day!" },
  { id: 3, image: chryssaCard3, text: "You have a fire in you, and it’s dangerously attractive! 🔥" }
];

const Chryssa = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [showFinalCard, setShowFinalCard] = useState(false);
  const [bunnies, setBunnies] = useState([]);
  const [showTitle, setShowTitle] = useState(true);

  const handleCardClick = (card) => {
    if (!selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const revealFinalCard = () => {
    setShowFinalCard(true);
    setBunnies(Array.from({ length: 80 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100 + "%",
      animationDuration: Math.random() * 3 + 2 + "s",
      animationDelay: Math.random() * 2 + "s",
    })));
    setTimeout(() => setShowTitle(false), 1000); // Hide the title with animation
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        bgImage={`url(${chryssaBg})`}
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
        {bunnies.map((bunny) => (
          <motion.div
            key={bunny.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: "100vh" }}
            transition={{ duration: parseFloat(bunny.animationDuration), delay: parseFloat(bunny.animationDelay), repeat: Infinity }}
            style={{
              position: "absolute",
              top: 0,
              left: bunny.left,
              fontSize: "30px",
              color: "white",
            }}
          >
            🐰
          </motion.div>
        ))}

        <AnimatePresence>
          {showTitle && (
            <MotionBox
              bg="rgba(0, 0, 0, 0.6)"
              p={4}
              borderRadius="md"
              boxShadow="xl"
              initial={{ opacity: 1 }}
              animate={!showFinalCard ? { opacity: 1, scale: [1, 1.1, 1] } : { opacity: 0 }}
              transition={{ duration: 1, repeat: !showFinalCard ? Infinity : 0 }}
            >
              <Heading color="white" fontSize="5xl" textShadow="0px 0px 15px rgba(255, 255, 255, 0.9)">
                Open the cards, bunny 🃏
              </Heading>
            </MotionBox>
          )}
        </AnimatePresence>

        {!showFinalCard ? (
          <Box display="flex" gap={60} mt={10}>
            {cards.map((card) => (
              <MotionBox
                key={card.id}
                whileHover={{ scale: 1.3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(card)}
                width="350px"
                height="550px"
                bg="gray.700"
                borderRadius="lg"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                boxShadow="0px 0px 20px rgba(255, 255, 255, 0.8)"
                p={4}
              >
                {selectedCards.find((c) => c.id === card.id) ? (
                  <>
                    <MotionImage src={card.image} borderRadius="lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
                    <Heading fontSize="md" color="white" mt={2}>{card.text}</Heading>
                  </>
                ) : (
                  <Box width="100%" height="100%" bg="gray.500" borderRadius="lg"></Box>
                )}
              </MotionBox>
            ))}
          </Box>
        ) : null}

        {selectedCards.length === 3 && !showFinalCard && (
          <Button mt={6} colorScheme="pink" onClick={revealFinalCard}>
            OPEN THE LAST CARD 🎴
          </Button>
        )}

        <AnimatePresence>
          {showFinalCard && (
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
              maxW="500px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <MotionImage src={chryssaFinalCard} borderRadius="lg" maxH="1000px" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} />
              <Heading fontSize="2xl" color="white" mt={4}>
              I love you, bunny! But if you keep being this cute, I might just explode. 💥🐰
              </Heading>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </ChakraProvider>
  );
};

export default Chryssa;
