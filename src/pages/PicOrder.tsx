import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getAuth, signOut, User, onAuthStateChanged } from "firebase/auth";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import Preloader from "../components/Preloader";

interface ImageData {
  url: string;
  id: string;
  order: number;
}

const PicOrder: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [changing, setChanging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log("user is null");
        window.location.href = "/login";
      }
    });

    const fetchInitialOrder = async () => {
      try {
        const response = await fetch(
          "https://getorder-3w3sueupsa-uc.a.run.app"
        );
        const data: ImageData[] = await response.json();
        if (data && data.length > 0) {
          setImages(data);
          setIsLoading(false);
        } else {
          console.log("json empty");
        }
      } catch (error) {
        console.error("Error fetching initial order:", error);
      }
    };
    fetchInitialOrder();
    // console.log(images);
    return () => unsubscribe();
  }, [auth]);
  console.log(images);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleSaveOrder = async (newImages: ImageData[]) => {
    setChanging(true);
    // Update the order field before sending to backend
    const updatedImages = newImages.map((image) => ({
      ...image,
    }));

    try {
      const response = await fetch(
        "https://saveorder-3w3sueupsa-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedImages),
        }
      );

      if (response.ok) {
        console.log("Order sent successfully");
        // window.location.reload();
        setChanging(false);
      } else {
        console.error("Error sending order");
      }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  const handleSortChange = (newImages: ImageData[]) => {
    const updatedImages = newImages.map((image, index) => ({
      ...image,
      order: index + 1,
    }));
    setImages(updatedImages);
    // console.log("Updated image array:", updatedImages);
  };

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className="absolute p-4 text-white right-4 top-10 z-50">
        {currentUser && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
      <ReactSortable
        list={images}
        setList={handleSortChange}
        className="container mx-auto grid gap-12 md:grid-cols-3 sm:grid-cols-1 min-h-screen mt-[20vh] place-items-center "
      >
        {images
          .sort((a, b) => a.order - b.order)
          .map(({ url, id }, index) => (
            <div
              key={id}
              data-src={url}
              className="w-full max-w-20 relative cursor-pointer"
            >
              <img
                alt={`Image ${id}`}
                src={url}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-black text-white px-2 py-1 text-sm">
                {index + 1}
              </div>
            </div>
          ))}
      </ReactSortable>
      <div className="container mx-auto flex justify-center gap-16 my-10">
        <button
          onClick={() => handleSaveOrder(images)}
          className={`py-2 px-4 rounded ${
            changing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          }`}
          disabled={changing}
        >
          {changing ? "Saving..." : "Save Order"}
        </button>
        <CloudinaryUploadWidget
          uwConfig={{
            cloudName: "dvondacho",
            uploadPreset: "ella_makeup",
          }}
          disabled={changing}
        />
      </div>
    </>
  );
};

export default PicOrder;
