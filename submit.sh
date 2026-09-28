#!/bin/bash

# Name of the output zip file
ZIP_NAME="HybridAppDev_Submission.zip"

echo "Archiving project to $ZIP_NAME..."

# Zip the current directory recursively
# -r: recursive
# -x: exclude patterns
zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x ".expo/*" \
  -x ".agents/*" \
  -x ".claude/*" \
  -x "$ZIP_NAME"

echo "Done! Created $ZIP_NAME"
