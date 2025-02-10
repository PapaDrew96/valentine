import { Box, Button, VStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import roseBackground from "./assets/rose.jpg"; // Background image

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const fallingHearts = Array.from({ length: 15 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100 + "%",
  animationDuration: Math.random() * 3 + 2 + "s",
  animationDelay: Math.random() * 2 + "s",
}));

const Home = () => {
  return (
    <Box
      bgImage={`url(${roseBackground})`}
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Falling Hearts */}
      {fallingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: "100vh" }}
          transition={{ duration: parseFloat(heart.animationDuration), delay: parseFloat(heart.animationDelay), repeat: Infinity }}
          style={{
            position: "absolute",
            top: 0,
            left: heart.left,
            fontSize: "24px",
            color: "red",
          }}
        >
          ❤️
        </motion.div>
      ))}
      
      <VStack spacing={6}>
        <Heading 
          color="white" 
          fontSize="5xl" 
          as={motion.h1} 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
          textShadow="0px 0px 15px rgba(255, 255, 255, 0.9)"
        >
          My Valentine Girls ❤️
        </Heading>
        <VStack spacing={4}>
          <MotionButton 
            as={Link} 
            to="/Katerina" 
            colorScheme="pink" 
            size="lg" 
            width="200px" 
            whileHover={{ scale: 1.8, rotate: 5, backgroundColor: "#ff69b4" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            shadow="lg"
            borderRadius="full"
          >
            💖 Katerina 💖
          </MotionButton>
          <MotionButton 
            as={Link} 
            to="/Phaedra" 
            colorScheme="pink" 
            size="lg" 
            width="200px" 
            whileHover={{ scale: 1.8, rotate: -5, backgroundColor: "#ff69b4" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            shadow="lg"
            borderRadius="full"
          >
            💕 Phaedra 💕
          </MotionButton>
          <MotionButton 
            as={Link} 
            to="/Chryssa" 
            colorScheme="pink" 
            size="lg" 
            width="200px" 
            whileHover={{ scale: 1.8, rotate: 5, backgroundColor: "#ff69b4" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            shadow="lg"
            borderRadius="full"
          >
            💗 Chryssa 💗
          </MotionButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Home;
