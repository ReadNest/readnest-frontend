import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ZoomInIcon, ChevronLeft, ChevronRight } from "lucide-react";

export type BookImage = {
  id: string;
  imageUrl: string;
  order: number;
};

type Props = {
  bookImages: BookImage[];
};

const BookImageGallery: React.FC<Props> = ({ bookImages }) => {
  const sortedImages = [...bookImages].sort((a, b) => a.order - b.order);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Responsive MAX_THUMBNAILS
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxThumbnails, setMaxThumbnails] = useState(4);

  useEffect(() => {
    function updateMaxThumbnails() {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      // 88 = 80px thumbnail + 8px gap
      let count = Math.floor((width - 32) / 88) - 1; // Trừ thêm 1 để tránh tràn dòng
      count = Math.max(1, Math.min(count, sortedImages.length));
      setMaxThumbnails(count);
    }
    updateMaxThumbnails();
    console.log("Max thumbnails updated:", maxThumbnails);
    window.addEventListener("resize", updateMaxThumbnails);
    return () => window.removeEventListener("resize", updateMaxThumbnails);
  }, [sortedImages.length]);

  if (sortedImages.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const mainImage = sortedImages[currentImageIndex];
  const visibleThumbnails = sortedImages.slice(0, maxThumbnails);
  const hasExtraImages = sortedImages.length > maxThumbnails;
  const extraImagesCount = sortedImages.length - maxThumbnails;

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? sortedImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4" ref={containerRef}>
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogTrigger asChild>
          <Card className="relative w-full aspect-square max-w-[220px] sm:max-w-[300px] mx-auto rounded-xl shadow-md overflow-hidden group cursor-zoom-in">
            <CardContent className="p-0 w-full h-full">
              <img
                src={mainImage.imageUrl}
                alt="Main Book Cover"
                className="w-full h-full object-contain bg-white"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <ZoomInIcon className="h-8 w-8 text-white" />
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="w-auto h-auto max-w-[80vw] max-h-[80vh] p-0 bg-transparent border-none shadow-xl rounded-lg overflow-visible">
          <div className="relative flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 
                 z-10 p-2 sm:p-3 rounded-full bg-black/30 
                 hover:bg-black/60 text-white 
                 shadow-md transition-all hover:ring-2 hover:ring-white/60"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <img
              src={mainImage.imageUrl}
              alt="Zoomed Book Cover"
              className="max-w-[70vw] max-h-[70vh] object-contain shadow-lg rounded-md"
            />

            <button
              onClick={handleNext}
              className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 
                 z-10 p-2 sm:p-3 rounded-full bg-black/30 
                 hover:bg-black/60 text-white 
                 shadow-md transition-all hover:ring-2 hover:ring-white/60"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap justify-center gap-2 px-4">
        {visibleThumbnails.map((img) => (
          <Card
            key={img.id}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${mainImage.id === img.id
              ? "ring-2 ring-blue-500 scale-105"
              : "opacity-80 hover:opacity-100 hover:scale-105"
              }`}
            onClick={() =>
              setCurrentImageIndex(
                sortedImages.findIndex((i) => i.id === img.id)
              )
            }
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
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${mainImage.id === img.id
                      ? "ring-2 ring-blue-500"
                      : "hover:ring-1 hover:ring-gray-300"
                      }`}
                    onClick={() => {
                      setCurrentImageIndex(
                        sortedImages.findIndex((i) => i.id === img.id)
                      );
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
