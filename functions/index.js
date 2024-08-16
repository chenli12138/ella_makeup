const { logger } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { v2: cloudinary } = require("cloudinary");

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const collectionName = "images"; // Change this to your preferred collection name
const collectionRef = db.collection(collectionName);

cloudinary.config({
  cloud_name: "dvondacho",
  api_key: "962945748383988",
  api_secret: "H5YvROV4d9K28JNh-_N27dHN9vU",
});
exports.getphotos = onRequest({ cors: true }, async (req, res) => {
  try {
    const snapshot = await collectionRef.get();
    let existingImages = [];
    if (!snapshot.empty) {
      existingImages = snapshot.docs.map((doc) => doc.data());
    }
    res.status(200).send(existingImages);
  } catch (error) {
    logger.error("Error processing getorder request:", error);
    res.status(500).send("Error processing request");
  }
});

exports.getorder = onRequest({ cors: true }, async (req, res) => {
  try {
    logger.info("Fetching images from Cloudinary");
    // Fetch the latest images from Cloudinary
    const { resources } = await cloudinary.search
      .expression("") // Fetch from the root folder
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    // Fetch existing images from Firestore
    const snapshot = await collectionRef.get();
    let existingImages = [];
    if (!snapshot.empty) {
      existingImages = snapshot.docs.map((doc) => doc.data());
    }

    // Create a map of existing images by URL
    const existingImagesMap = new Map(
      existingImages.map((img) => [img.url, img])
    );

    const newImages = resources.map((resource, index) => {
      const url = cloudinary.url(resource.public_id, {
        transformation: [{ quality: 50 }, { fetch_format: "auto" }],
      });

      // Preserve the order if the image already exists
      const existingImage = existingImagesMap.get(url);
      const order = existingImage ? existingImage.order : index + 1;

      return {
        id: resource.asset_id,
        url,
        order,
      };
    });

    // Combine existing images with new images
    const updatedImages = newImages.map(
      (img) => existingImagesMap.get(img.url) || img
    );

    logger.info("Writing updated images to Firestore");
    // Write the updated data to Firestore
    await Promise.all(
      updatedImages.map((image) => collectionRef.doc(image.id).set(image))
    );

    // Send the updated data as the response
    res.status(200).send(updatedImages);
  } catch (error) {
    logger.error("Error processing getorder request:", error);
    res.status(500).send("Error processing request");
  }
});

exports.saveorder = onRequest({ cors: true }, async (req, res) => {
  try {
    logger.info("Saving order to Firestore");
    const updatedImages = req.body;

    // Fetch all existing documents in the collection
    const snapshot = await collectionRef.get();
    const existingImages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Create a map for easy lookup of existing images
    const existingImagesMap = new Map(
      existingImages.map((image) => [image.id, image])
    );

    // Determine which documents to add or update
    const addUpdatePromises = [];

    // Iterate over updatedImages to find documents to add or update
    updatedImages.forEach((image) => {
      const existingImage = existingImagesMap.get(image.id);
      if (JSON.stringify(existingImage) !== JSON.stringify(image)) {
        addUpdatePromises.push(collectionRef.doc(image.id).set(image));
      }
    });

    // Execute all add/update promises
    await Promise.all(addUpdatePromises);

    res.status(200).send(updatedImages);
  } catch (error) {
    logger.error("Error processing saveorder request:", error);
    res.status(500).send("Error processing request");
  }
});

exports.delete = onRequest({ cors: true }, async (req, res) => {
  // Delete all existing documents in the collection
  const snapshot = await collectionRef.get();
  const deletePromises = [];
  snapshot.forEach((doc) => {
    deletePromises.push(collectionRef.doc(doc.id).delete());
  });
  await Promise.all(deletePromises);
  res.status(200).send("deleted documents");
});
