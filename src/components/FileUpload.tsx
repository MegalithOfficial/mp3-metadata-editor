import { Button, VStack, Text, Box, Icon } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Toaster, toaster } from './ui/toaster';

const FileUpload: React.FC<{ onFileUpload: (file: File) => void }> = ({ onFileUpload }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [fileName, setFileName] = useState<string | null>(null);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === 'audio/mpeg') {
         setFileName(file.name);
         onFileUpload(file);
      } else {
         toaster.create({
            title: 'Failed to Upload',
            description: 'Please upload a valid MP3 file.',
            type: 'error',
            duration: 5000,
         });
      }
   };

   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = () => {
      setIsDragging(false);
   };

   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file && file.type === 'audio/mpeg') {
         setFileName(file.name);
         onFileUpload(file);
      } else {
         toaster.create({
            title: 'Failed to Upload',
            description: 'Please upload a valid MP3 file.',
            type: 'error',
            duration: 5000,
         });
      }
   };

   return (
      <VStack gap={4} width="100%" alignItems="center">
         <Toaster />
         <motion.div
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
         >
            <Box
               bgGradient={
                  isDragging
                     ? 'linear(to-r, white, blue.500)'
                     : 'linear(to-r, gray.800, gray.900)'
               }
               boxShadow="xl"
               p={8}
               borderRadius="2xl"
               border="2px dashed"
               borderColor={isDragging ? 'teal.400' : 'gray.400'}
               textAlign="center"
               width="100%"
               maxWidth="500px"
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
               cursor="pointer"
               onClick={() => inputRef.current?.click()}
            >

               <Icon boxSize={10} color="white" mb={3}>
                  <FaFileUpload />
               </Icon>
               <Text fontSize="lg" fontWeight="semibold" color={isDragging ? 'teal.200' : 'gray.200'}>
                  {fileName || 'Drag & drop an MP3 file here, or click to select'}
               </Text>
               <Text fontSize="sm" color={isDragging ? 'teal.400' : 'gray.400'}>
                  Only MP3 files are supported
               </Text>
            </Box>
         </motion.div>
         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
               colorScheme="gray"
               bg="gray.500"
               _hover={{ bg: 'gray.500' }}
               _active={{ bg: 'gray.800' }}
               size="lg"
               variant="solid"
               onClick={() => inputRef.current?.click()}
            >
               <FaFileUpload />
               Choose File
            </Button>
         </motion.div>

         <input
            type="file"
            accept="audio/mpeg"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
         />
      </VStack>
   );
};

export default FileUpload;
