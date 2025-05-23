import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ZoomInIcon } from "lucide-react";

export type BookImage = {
  id: string;
  imageUrl: string;
  order: number;
};

type Props = {
  bookImages: BookImage[];
};

const MAX_THUMBNAILS = 4;

const BookImageGallery: React.FC<Props> = ({ bookImages }) => {
  const [mainImage, setMainImage] = useState<BookImage>(bookImages[0]);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const sortedImages = [...bookImages].sort((a, b) => a.order - b.order);
  const visibleThumbnails = sortedImages.slice(0, MAX_THUMBNAILS);
  const hasExtraImages = sortedImages.length > MAX_THUMBNAILS;
  const extraImagesCount = sortedImages.length - MAX_THUMBNAILS;

  if (sortedImages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image with Zoom */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogTrigger asChild>
          <Card className="relative w-full aspect-square max-w-[500px] mx-auto rounded-xl shadow-md overflow-hidden group cursor-zoom-in">
            <CardContent className="p-0 w-full h-full">
              <img
                src={mainImage.imageUrl}
                alt="Main Book Cover"
                className="w-full h-full object-contain bg-white"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <ZoomInIcon className="h-10 w-10 text-white" />
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="w-auto h-auto max-w-[80vw] max-h-[80vh] p-0 bg-transparent border-none shadow-xl rounded-lg overflow-hidden">
          <div className="relative">
            <div className="flex items-center justify-center p-4">
              <img
                src={mainImage.imageUrl}
                alt="Zoomed Book Cover"
                className="max-w-[70vw] max-h-[70vh] object-contain shadow-lg rounded-md"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {visibleThumbnails.map((img) => (
          <Card
            key={img.id}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
              mainImage.id === img.id
                ? "ring-2 ring-blue-500 scale-105"
                : "opacity-80 hover:opacity-100 hover:scale-105"
            }`}
            onClick={() => setMainImage(img)}
          >
            <img
              src={img.imageUrl}
              alt={`Thumbnail ${img.order}`}
              className="w-full h-full object-cover"
            />
          </Card>
        ))}

        {hasExtraImages && (
          <Dialog>
            <DialogTrigger asChild>
              <Card className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="text-gray-700 font-medium text-sm sm:text-base">
                  +{extraImagesCount}
                </div>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <div className="grid grid-cols-3 gap-3 p-4">
                {sortedImages.map((img) => (
                  <Card
                    key={img.id}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                      mainImage.id === img.id
                        ? "ring-2 ring-blue-500"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                    onClick={() => {
                      setMainImage(img);
                      setIsZoomOpen(false);
                    }}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Thumbnail ${img.order}`}
                      className="w-full h-full object-cover"
                    />
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default BookImageGallery;
