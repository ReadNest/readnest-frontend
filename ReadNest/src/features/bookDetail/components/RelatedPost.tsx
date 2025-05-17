interface RelatedPostProps {
    author: string;
    time: string;
    title: string;
    content: string;
    likes: number;
  }
  
  const RelatedPost = ({ author, time, title, content, likes }: RelatedPostProps) => {
    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{author}</h3>
            <p className="text-gray-500 text-sm">{time}</p>
          </div>
          <span className="text-gray-500">{likes}</span>
        </div>
        <h4 className="font-bold mb-2">{title}</h4>
        <p className="text-gray-700">{content}</p>
      </div>
    );
  };
  
  export default RelatedPost;