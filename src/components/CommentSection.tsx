import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

interface CommentSectionProps {
  lessonId: string;
}

const CommentSection = ({ lessonId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Você',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      content: newComment,
      date: new Date().toLocaleDateString(),
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      author: {
        name: 'Você',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      content: replyContent,
      date: new Date().toLocaleDateString()
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Comentários</h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Your avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
              className="w-full bg-[#2A2A2A] text-white px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#E50914] text-white px-4 py-2 rounded-md hover:bg-[#b8070f] transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Comentar</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white">{comment.author.name}</span>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300 mb-2">{comment.content}</p>
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Responder
                </button>
              </div>
            </div>

            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-4 ml-12">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{reply.author.name}</span>
                    <span className="text-sm text-gray-400">{reply.date}</span>
                  </div>
                  <p className="text-gray-300">{reply.content}</p>
                </div>
              </div>
            ))}

            {replyingTo === comment.id && (
              <div className="flex gap-4 ml-12">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Your avatar"
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Adicione uma resposta..."
                    className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="flex items-center gap-2 bg-[#E50914] text-white px-3 py-1 rounded-md hover:bg-[#b8070f] transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>Responder</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;