#!/bin/bash

# Directory containing the images
IMAGE_DIR="./src/assets/pics"

# Directory to save the blurred images
BLURRED_DIR="${IMAGE_DIR}/blurred"

# Create the blurred directory if it doesn't exist
mkdir -p "$BLURRED_DIR"

# Loop through all jpg, png, JPG files in the directory
for image in "$IMAGE_DIR"/*.{jpg,png,JPG}; do
  # Continue only if file exists
  [ -e "$image" ] || continue

  # Extract filename without extension
  filename=$(basename "$image")
  filename="${filename%.*}"

  # Create a blurred and scaled version of the image
  ffmpeg -i "$image" -vf "scale=20:-1,boxblur=5:1" "$BLURRED_DIR/${filename}-small.jpg"
done

echo "Blurred images created in $BLURRED_DIR"
