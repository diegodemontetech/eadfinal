import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Heart, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { news } from '../../data/news';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(news.find(n => n.id === postId));
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; date: string }>>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const currentPost = news.find(n => n.id === postId);
    if (!currentPost) {
      navigate('/blog');
      return;
    }
    setPost(currentPost);
  }, [postId, navigate]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: 'Você',
        text: comment,
        date: new Date().toLocaleDateString()
      }
    ]);
    setComment('');
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  if (!post) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar para Notícias</span>
      </button>

      <article className="bg-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="aspect-[21/9] relative">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] to-transparent" />
        </div>

        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#E50914] text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-sm text-gray-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                <Heart className="h-6 w-6" fill={isLiked ? 'currentColor' : 'none'} />
                <span>{likes}</span>
              </button>

              <div className="relative">
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Share2 className="h-6 w-6" />
                </button>
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#2A2A2A] rounded-lg shadow-xl overflow-hidden"
                    >
                      {['Twitter', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                        <button
                          key={platform}
                          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#3A3A3A] transition-colors"
                        >
                          {platform}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div 
            className="prose prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold text-white mb-6">Comentários</h3>
            
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Your avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
                <div key={comment.id} className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt={comment.author}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{comment.author}</span>
                      <span className="text-sm text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;