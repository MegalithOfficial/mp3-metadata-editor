import { Button, VStack, Text, Box } from '@chakra-ui/react';
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
         <Box
            as={motion.div}
            _hover={{ scale: 1.05 }}
            _open={{ scale: 0.95 }}
            bg={isDragging ? "blue.500" : "gray.100"}
            p={6}
            borderRadius="lg"
            border="2px dashed"
            borderColor={isDragging ? "blue.300" : "gray.300"}
            textAlign="center"
            width="100%"
            maxWidth="400px"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            cursor="pointer"
            onClick={() => inputRef.current?.click()}
         >
            <Text fontSize="md" color={isDragging ? "white" : "gray.600"}>
               {fileName || "Drag and drop an MP3 file here, or click to select"}
            </Text>
         </Box>
         <Button
            colorScheme="#27272a"
            onClick={() => inputRef.current?.click()}
         >
            <FaFileUpload />
            Choose File
         </Button>
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
