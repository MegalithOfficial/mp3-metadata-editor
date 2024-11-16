import { Box, Heading, Text, Grid, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUpload, FaEdit, FaDownload, FaShieldAlt } from 'react-icons/fa';

const HowItWorks = () => {
   return (
      <Box py={16} px={6} bg="gray.800" color="white" bgGradient="linear(to-r, gray.900, gray.800)">
         <Heading fontSize={{ base: '3xl', md: '4xl' }} textAlign="center" mb={12} letterSpacing="wide">
            How It Works
         </Heading>
         <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={8}
            maxW="1200px"
            mx="auto"
            alignItems="center"
            justifyContent="center"
         >
            {[
               {
                  step: 'Upload',
                  description: 'Simply upload your MP3 file to begin editing its tags.',
                  icon: <FaUpload size={40} />,
               },
               {
                  step: 'Edit Tags',
                  description: 'Easily modify metadata like title, artist, album, and even add a custom cover image.',
                  icon: <FaEdit size={40} />,
               },
               {
                  step: 'Save & Download',
                  description: 'Once you’re happy with the changes, save the file and download it with updated tags.',
                  icon: <FaDownload size={40} />,
               },
            ].map((item, idx) => (
               <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * idx, duration: 0.6, ease: 'easeOut' }}
               >
                  <Box
                     p={8}
                     bg="gray.700"
                     borderRadius="lg"
                     boxShadow="lg"
                     textAlign="center"
                     transition="transform 0.3s ease"
                     _hover={{ transform: 'scale(1.07)', boxShadow: 'xl', bg: 'gray.600' }}
                  >
                     <VStack gap={4}>
                        <Box color="white">{item.icon}</Box>
                        <Heading fontSize="2xl">{item.step}</Heading>
                        <Text fontSize="md" color="gray.300" lineHeight="1.7">
                           {item.description}
                        </Text>
                     </VStack>
                  </Box>
               </motion.div>
            ))}
         </Grid>

         {/* Fully Anonymous Section */}
         <Box mt={16} textAlign="center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            >
               <Box
                  p={8}
                  bg="gray.700"
                  borderRadius="lg"
                  boxShadow="lg"
                  textAlign="center"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.07)', boxShadow: 'xl', bg: 'gray.600' }}
                  maxW="800px"
                  mx="auto"
               >
                  <VStack gap={4}>
                     <Box color="white">
                        <FaShieldAlt size={40} />
                     </Box>
                     <Heading fontSize="2xl">Top-Tier Privacy</Heading>
                     <Text fontSize="md" color="gray.300" lineHeight="1.7">
                     All file processing is done locally, directly in your browser. We never upload your files to any server, 
                     ensuring your privacy is fully protected. Your data remains on your device, completely secure and never shared with anyone.
                     </Text>
                  </VStack>
               </Box>
            </motion.div>
         </Box>

      </Box>
   );
};

export default HowItWorks;
