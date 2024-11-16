import React from 'react';
import { Box, Heading, Text, Flex, Table } from '@chakra-ui/react';

const MetaTagInfo: React.FC = () => {
   return (
      <Box py={12} px={6} bg="gray.900" color="white">
         <Heading fontSize="3xl" textAlign="center" mb={6} fontWeight="bold" letterSpacing="wider">
            Understanding MP3 Metadata Tags
         </Heading>
         <Text fontSize="lg" textAlign="center" mb={8} maxW="800px" mx="auto" opacity={0.8}>
            MP3 files contain several metadata tags that help organize and display information about the music. Below is a list of common MP3 metadata tags with brief descriptions.
         </Text>

         {/* Custom Table Layout */}
         <Flex direction="column" align="center" justify="center" maxW="1200px" mx="auto">
            <Box width="100%" overflowX="auto" borderRadius="md" boxShadow="lg">
               <Table.Root>
                  <Table.Header>
                     <Table.Row>
                        <Table.ColumnHeader p={4} textAlign="left" bg="gray.800" color="white" borderBottom="2px solid #444">
                           Title
                        </Table.ColumnHeader>
                        <Table.ColumnHeader p={4} textAlign="left" bg="gray.800" color="white" borderBottom="2px solid #444">
                           Code Name
                        </Table.ColumnHeader>
                        <Table.ColumnHeader p={4} textAlign="left" bg="gray.800" color="white" borderBottom="2px solid #444">
                           Description
                        </Table.ColumnHeader>
                     </Table.Row>
                  </Table.Header>
                  <Table.Body>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Title
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           TIT2
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           The name of the song or track. This is the primary identifier of the music.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           Artist
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           TPE1
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           The performer or creator of the music, such as the musician or band.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Album
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           TALB
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           The name of the album that the track is part of.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           Genre
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           TCON
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           The genre or style of the music (e.g., pop, rock, jazz, classical).
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Album Art
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           APIC
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           The image associated with the album, usually the cover artwork.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           Track Number
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           TRCK
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           The number of the track within the album, helpful for organizing the order.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Year
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           TYER
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           The year the track or album was released.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           Comment
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           COMM
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           An optional field for additional notes or comments about the track.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Composer
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           TCOM
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           The person who composed the music, different from the artist or performer.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           Publisher
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           TPUB
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.800" borderBottom="1px solid #444">
                           The entity responsible for publishing the track or album.
                        </Table.Cell>
                     </Table.Row>
                     <Table.Row>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Lyrics
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           USLT
                        </Table.Cell>
                        <Table.Cell p={4} bg="gray.700" borderBottom="1px solid #444">
                           Unsynced lyrics that can be displayed along with the music.
                        </Table.Cell>
                     </Table.Row>
                  </Table.Body>
               </Table.Root>
            </Box>
         </Flex>
      </Box>
   );
};

export default MetaTagInfo;
