import React, { useEffect, useState, useRef } from 'react';
import { Box, VStack, Text, Center, Image as HTMLImage, IconButton, Flex } from '@chakra-ui/react';
import { parseBlob } from 'music-metadata';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Slider } from './ui/slider';
import ColorThief from '@neutrixs/colorthief';

interface SongCardProps {
   file: File;
   tags: {
      title?: string;
      artist?: string;
      album?: string;
      genre?: string;
      unsyncedLyrics?: string;
   };
   coverImage: string | null;
}

const SongCard: React.FC<SongCardProps> = ({ file, tags, coverImage }) => {
   const [songInfo, setSongInfo] = useState({ name: '', author: '', album: '' });
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [duration, setDuration] = useState(0);
   const [gradient, setGradient] = useState<string>('gray.800');
   const audioRef = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      const loadMetadata = async () => {
         try {
            const metadata = await parseBlob(file);
            setSongInfo({
               name: metadata.common.title || file.name,
               author: metadata.common.artist || 'Unknown Artist',
               album: metadata.common.album || 'Unknown Album',
            });
         } catch (err) {
            console.error(err);
         }
      };
      loadMetadata();
   }, [file]);

   useEffect(() => {
      if (coverImage) {
         const img = new Image();
         img.crossOrigin = 'Anonymous';
         img.src = coverImage;
         img.onload = () => {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(img, 3); // Get three prominent colors
            if (palette) {
               const [color1, color2, color3] = palette;
               setGradient(
                  isPlaying
                     ? `linear-gradient(135deg, rgba(${color1.join(',')}, 0.9), rgba(${color2.join(',')}, 0.7), rgba(${color3.join(',')}, 0.5))`
                     : `linear-gradient(to bottom right, rgb(${color1.join(',')}), rgb(${color2.join(',')}))`
               );
            }
         };
      } else {
         setGradient('gray.800');
      }
   }, [coverImage, isPlaying]);

   const togglePlayPause = () => {
      if (!audioRef.current) {
         audioRef.current = new Audio(URL.createObjectURL(file));
         audioRef.current.addEventListener('timeupdate', () => {
            setProgress((audioRef.current!.currentTime / audioRef.current!.duration) * 100);
         });
         audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current!.duration);
         });
      }
      if (isPlaying) {
         audioRef.current.pause();
      } else {
         audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
   };

   const handleSliderChange = (value: number[]) => {
      if (audioRef.current) {
         audioRef.current.currentTime = (value[0] / 100) * audioRef.current.duration;
         setProgress(value[0]);
      }
   };

   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };

   useEffect(() => {
      return () => {
         if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = ''; // Cleanup audio object
         }
      };
   }, []);

   return (
      <Center w="full" h="full">
         <Box
            w={{ base: '90%', md: '70%' }}
            p={6}
            bg={gradient}
            borderRadius="md"
            boxShadow="lg"
            textAlign="center"
            transition="0.3s"
            _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
            style={{
               backgroundImage: gradient,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         >
            <Flex align="center" gap={4}>
               {coverImage ? (
                  <HTMLImage
                     src={coverImage}
                     alt="Cover Image"
                     borderRadius="md"
                     boxSize={{ base: '120px', md: '150px' }}
                     objectFit="cover"
                     _hover={{ transform: 'scale(1.05)' }}
                  />
               ) : (
                  <Box bg="gray.600" w="120px" h="120px" borderRadius="md"></Box>
               )}
               <VStack align="flex-start" gap={1}>
                  <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="white">
                     {tags.title || songInfo.name}
                  </Text>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.300">
                     {tags.artist || songInfo.author}
                  </Text>
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.400">
                     {tags.album || songInfo.album}
                  </Text>
               </VStack>
            </Flex>
            <Flex align="center" w="full" mt={4}>
               <IconButton
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  onClick={togglePlayPause}
                  colorScheme="teal"
                  size="lg"
                  color="gray.500"
                  _hover={{ bg: 'gray.400', color: 'white' }}
                  mr={4}
               >
                  {isPlaying ? <FaPause /> : <FaPlay />}
               </IconButton>
               <Flex align="center" w="full">
                  <Slider
                     value={[progress]}
                     onValueChange={(e) => handleSliderChange(e.value)}
                     w="80%"
                     colorScheme="teal"
                     mr={1}
                  />
                  <Text color="gray.300" mr={2}>
                     {formatTime(audioRef.current ? audioRef.current.currentTime : 0)} / {formatTime(duration)}
                  </Text>
               </Flex>
            </Flex>
         </Box>
      </Center>
   );
};

export default SongCard;
