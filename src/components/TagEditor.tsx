import React, { useEffect, useState } from 'react';
import { Box, Button, Input, VStack, Textarea, HStack, Image, Text, Flex } from '@chakra-ui/react';
import { parseBlob } from 'music-metadata';
import { saveAs } from 'file-saver';
import { ID3Writer } from 'browser-id3-writer';
import { Field } from './ui/field';
import { Toaster, toaster } from './ui/toaster';
import { fromByteArray } from 'base64-js';

interface TagData {
   title?: string;
   artist?: string;
   album?: string;
   genre?: string;
   unsyncedLyrics?: string;
};

interface TagEditorProps {
   file: File;
   onTagsChange: (updatedTags: TagData, coverImage?: string | null) => void;
};

const TagEditor: React.FC<TagEditorProps> = ({ file, onTagsChange }) => {
   const [tags, setTags] = useState<TagData>({});
   const [coverImage, setCoverImage] = useState<File | null>(null);
   const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

   useEffect(() => {
      const loadMetadata = async () => {
         try {
            const metadata = await parseBlob(file);
            const loadedTags: TagData = {
               title: metadata.common.title || '',
               artist: metadata.common.artist || '',
               album: metadata.common.album || '',
               genre: metadata.common.genre?.[0] || '',
               unsyncedLyrics: '',
            };

            let coverImageUrl = null;
            if (metadata.common.picture && metadata.common.picture.length > 0) {
               const picture = metadata.common.picture[0];
               const base64String = `data:${picture.format};base64,${fromByteArray(picture.data)}`;
               coverImageUrl = base64String;
            }

            setTags(loadedTags);
            setCoverImagePreview(coverImageUrl);
            onTagsChange(loadedTags, coverImageUrl);

            toaster.create({
               title: 'Success',
               description: 'Metadata loaded successfully!',
               type: 'success',
               duration: 5000,
            });

         } catch (err) {
            console.error(err);
            toaster.create({
               title: 'Error loading metadata',
               description: 'There was an issue loading the metadata from the file.',
               type: 'error',
               duration: 5000,
            });
         }
      };
      loadMetadata();
   }, [file, onTagsChange]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updatedTags = { ...tags, [name]: value };
      setTags(updatedTags);
      onTagsChange(updatedTags, coverImagePreview);
   };

   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const selectedFile = e.target.files[0];
         const validTypes = ['image/jpeg', 'image/png'];

         if (validTypes.includes(selectedFile.type)) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setCoverImage(selectedFile);
            setCoverImagePreview(previewUrl);
            onTagsChange(tags, previewUrl);
         } else {
            toaster.create({
               title: 'Invalid image format',
               description: 'Please upload a valid image file (JPEG or PNG).',
               type: 'error',
               duration: 5000,
            });
            setCoverImage(null);
         }
      }
   };

   const handleSave = async () => {
      try {
         const arrayBuffer = await file.arrayBuffer();
         const uint8Array = new Uint8Array(arrayBuffer);
         const writer = new ID3Writer(uint8Array);

         writer.setFrame('TIT2', tags.title || '');
         writer.setFrame('TPE1', [tags.artist || '']);
         writer.setFrame('TALB', tags.album || '');
         writer.setFrame('TCON', [tags.genre || '']);

         if (tags.unsyncedLyrics) {
            writer.setFrame('USLT', {
               description: 'Song Lyrics',
               language: 'eng',
               lyrics: tags.unsyncedLyrics,
            });
         }

         if (coverImage) {
            const coverImageArrayBuffer = await coverImage.arrayBuffer();
            writer.setFrame('APIC', {
               description: 'Cover',
               type: 3,
               data: new Uint8Array(coverImageArrayBuffer),
            });
         }

         writer.addTag();
         const taggedBlob = writer.getBlob();
         saveAs(taggedBlob, `Edited_${file.name}`);

         toaster.create({
            title: 'Changes saved successfully!',
            description: 'Your changes have been applied to the file.',
            type: 'success',
            duration: 5000,
         });
      } catch (err) {
         console.error(err);
         toaster.create({
            title: 'Failed to save changes',
            description: 'There was an error saving the changes to the file.',
            type: 'error',
            duration: 5000,
         });
      }
   };

   const handleButtonClick = () => {
      document.getElementById('coverImage')?.click();
   };

   return (
      <Box
         p={8}
         borderRadius="lg"
         shadow="lg"
         bg="gray.800"
         color="white"
         maxWidth="500px"
         margin="auto"
         textAlign="center"
      >
         <Toaster />
         <VStack gap={6} align="stretch">
            <Text fontSize="lg" fontWeight="bold">
               File Preview
            </Text>
            <Box
               p={4}
               borderRadius="md"
               bg="gray.700"
               shadow="md"
               textAlign="left"
               fontSize="sm"
            >
               <Flex direction="column" gap={2}>
                  <Text>
                     <strong>File Name:</strong> {file.name}
                  </Text>
                  <Text>
                     <strong>File Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
               </Flex>
            </Box>

            <VStack gap={4} align="stretch">
               <Field label="Title (TIT2)">
                  <Input
                     type="text"
                     name="title"
                     value={tags.title || ''}
                     onChange={handleInputChange}
                     placeholder="Enter title"
                  />
               </Field>
               <Field label="Artist (TPE1)">
                  <Input
                     type="text"
                     name="artist"
                     value={tags.artist || ''}
                     onChange={handleInputChange}
                     placeholder="Enter artist"
                  />
               </Field>
               <Field label="Album (TALB)">
                  <Input
                     type="text"
                     name="album"
                     value={tags.album || ''}
                     onChange={handleInputChange}
                     placeholder="Enter album"
                  />
               </Field>
               <Field label="Genre (TCON)">
                  <Input
                     type="text"
                     name="genre"
                     value={tags.genre || ''}
                     onChange={handleInputChange}
                     placeholder="Enter genre"
                  />
               </Field>
               <Field label="Unsynced Lyrics (USLT)">
                  <Textarea
                     name="unsyncedLyrics"
                     value={tags.unsyncedLyrics || ''}
                     onChange={handleInputChange}
                     placeholder="Enter unsynced lyrics"
                     resize="none"
                  />
               </Field>
               <HStack justify="space-between" w="full">
                  <Button onClick={handleButtonClick} colorScheme="teal" size="md" width="full">
                     Upload Cover Image (APIC)
                  </Button>
                  <Input
                     type="file"
                     accept="image/jpeg, image/png"
                     id="coverImage"
                     onChange={handleCoverImageChange}
                     display="none"
                  />
               </HStack>
               {coverImagePreview && (
                  <Image
                     src={coverImagePreview}
                     alt="Cover Image Preview"
                     borderRadius="md"
                     boxSize="150px"
                     objectFit="cover"
                     mt={4}
                  />
               )}
               <Button colorScheme="teal" size="md" onClick={handleSave} w="full">
                  Save Changes
               </Button>
            </VStack>
         </VStack>
      </Box>
   );
};

export default TagEditor;
