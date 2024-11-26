import React, { useCallback, useEffect, useState } from 'react';
import { VStack, Heading, Box, Grid, GridItem, Text, Link, Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import FileUpload from './components/FileUpload';
import TagEditor from './components/TagEditor';
import SongCard from './components/SongCard';

import "./App.css";
import HowItWorks from './components/HowItWorks';
import MetaTagInfo from './components/MetaTagInfo';

interface TagData {
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
  unsyncedLyrics?: string;
}

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editorTags, setEditorTags] = useState<TagData>({});
  const [cardTags, setCardTags] = useState<TagData>({});
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);


  const handleTagsChange = useCallback((updatedTags: TagData, coverImage?: string | null) => {
    setEditorTags(updatedTags);
    setCoverImage(coverImage as string | null);
  }, []);

  useEffect(() => {
    setCardTags(editorTags);
  }, [editorTags]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box minH="100vh" bg="gray.900" color="white" display="flex" flexDirection="column">

      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, rgba(29, 78, 216, 0.9), rgba(236, 72, 153, 0.9))"
        py={24}
        px={8}
        textAlign="center"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            padding: "3rem 1rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            mb={4}
            lineHeight="1.2"
          >
            Transform Your Music Library with Ease
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="700px"
            mx="auto"
            mb={8}
            opacity={0.9}
          >
            Easily edit MP3 tags, add album art, and manage your music metadata
            in just a few clicks. Organize your collection like never before.
          </Text>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              colorScheme="teal"
              size="lg"
              fontWeight="bold"
              boxShadow="0px 4px 15px rgba(0, 0, 0, 0.2)"
              transition="all 0.3s ease"
              _hover={{
                background: "linear-gradient(135deg, rgba(29, 78, 216, 0.9), rgba(236, 72, 153, 0.9))",
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
              }}
              _active={{
                background: "rgb(203, 96, 224)",
                transform: "scale(0.98)",
              }}
              onClick={() => {
                document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </Box>


      {/* How It Works Section */}
      <HowItWorks />

      {/* Main Content */}
      <Box id="main-content" py={12} px={6} display="flex" alignItems="center" justifyContent="center" flex="1">
        {selectedFile ? (
          <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6} w="full" maxW="1200px" mx="auto" p={6}>
            <GridItem
              className="fade-in"
              display="flex"
              justifyContent="center"
              w="full"
            >
              <Box w="full" p={6} bg="gray.800" borderRadius="md" boxShadow="lg" textAlign="center">
                <TagEditor file={selectedFile} onTagsChange={handleTagsChange} />
              </Box>
            </GridItem>
            <GridItem as={motion.div} display="flex" justifyContent="center" alignItems="center" height="100%" w="full">
              <SongCard file={selectedFile} tags={cardTags} coverImage={coverImage} />
            </GridItem>
          </Grid>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              gap={10}
              direction={{ base: 'column', md: 'row' }}
              w="full"
              maxW="1200px"
              mx="auto"
              p={6}
            >
              <Box
                p={6}
                bg="gray.700"
                borderRadius="md"
                boxShadow="xl"
                transition="transform 0.3s ease-in-out"
                w="full"
                maxW="400px"
                _hover={{ transform: 'scale(1.05)', bg: 'gray.600' }}
              >
                <FileUpload onFileUpload={setSelectedFile} />
              </Box>

              <motion.div>
                {isMobile ? (<FaArrowUp style={{ width: 80, height: 60 }} />) : (<FaArrowLeft style={{ width: 80, height: 60 }} />)}
              </motion.div>

              <VStack
                align="start"
                gap={6}
                maxW="500px"
                color="white"
                textAlign={{ base: 'center', md: 'left' }}
                w="full"
              >
                <Heading size="lg" fontWeight="bold">
                  Upload Your MP3
                </Heading>
                <Text fontSize="md" color="gray.300" lineHeight="1.5">
                  Start editing metadata, tags, and add a cover image to your MP3 files with ease.
                </Text>
              </VStack>
            </Flex>
          </motion.div>
        )}
      </Box>

      <MetaTagInfo />

      {/* Footer */}
      <Box as="footer" py={6} bg="gray.800" textAlign="center">
        <Flex alignItems="center" justifyContent="center" fontSize="sm">
          Made with ❤️ by{' '}
          <Link
            href="https://github.com/MegalithOfficial"
            color="teal.300"
            target="_blank"
            rel="noopener noreferrer"
            ml={2}
            display="inline-flex"
            alignItems="center"
          >
            Megalith
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default App;
