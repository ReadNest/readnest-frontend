interface CommentProps {
    author: string;
    time: string;
    content: string;
    likes: number;
  }

const Comment = ({ author, time, content, likes }: CommentProps) => {
    return (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{author}</h3>
            <p className="text-gray-500 text-sm">{time}</p>
          </div>
          <span className="text-gray-500">{likes}</span>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    );
  };
  
  export default Comment;