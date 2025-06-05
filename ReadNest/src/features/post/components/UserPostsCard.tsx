import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { RatingStars } from "@/features/search/components/RatingStars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  bookImageUrl: string;
  creator: string;
  creatorAvatarUrl: string;
  date: string;
  title: string;
  content: string;
  rating: number;
  views: number;
  likes: number;
}

export function PostCard({
  bookImageUrl,
  creator,
  creatorAvatarUrl,
  date,
  title,
  content,
  rating,
  views,
  likes,
}: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="w-full relative bg-gray-100 rounded border">
        <img
            src={bookImageUrl}
            alt={title}
            className="w-full h-48 object-contain rounded"
            loading="lazy"
            onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-book-cover.jpg";
            }}
        />
      </div>
      
      <CardHeader className="flex-grow pb-3">
        <div className="flex items-start gap-3">
          {/* Avatar người đánh giá */}
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={creatorAvatarUrl} alt={creator} />
            <AvatarFallback>{creator.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{creator}</p>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
              
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{content}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0">
        <RatingStars rating={rating}/>
        <div className="flex items-center mt-2 gap-2 text-sm text-muted-foreground">
          <span>{views} lượt xem</span>
          <span>•</span>
          <span>{likes} lượt thích</span>
        </div>
      </CardFooter>
    </Card>
  );
}