'use client';
import { useState, useEffect } from "react";
import { Avatar, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { FaComments, FaSearch, FaLinkedin, FaFacebook, FaReply, FaShare, FaFlag } from "react-icons/fa";
import styles from "../../../styles/SocialInbox/CommentSection.module.css";

    const CommentSection = ({ selectedPlatform }) => {
      const [comments, setComments] = useState([
        {
          id: 1,
          author: "Cameron Williamson",
          text: "Congrats on the recent award! Well-deserved recognition! 🎉🎉",
          avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
          platform: "LinkedIn",
          messageType: "comment",
          timestamp: new Date().toLocaleString(),
          likes: 77,
          priority: 'high',
          replies: [
            {
              id: 11,
              author: "Gen Ai",
              text: "Amazing to see your growth! Can't wait to see what's next!",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNFx6kzWPUb4Uv5ENgQNJvf-iP2WtuCoz8gA&s",
              priority: 'medium'
            }
          ]
        },
        {
          id: 2,
          author: "Gen Ai HR",
          text: "InnovateAI is a cutting-edge technology firm specializing in artificial intelligence solutions.",
          image: "https://t3.ftcdn.net/jpg/08/95/96/56/240_F_895965612_scBvcUMUOh7a2qXfNrFhuNmbDs8AtgWH.jpg",
          avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
          platform: "Facebook",
          messageType: "mention",
          timestamp: new Date().toLocaleString(),
          priority: 'low',
          replies: [
            {
              id: 21,
              author: "Gen Ai",
              text: "Amazing to see your growth! Can't wait to see what's next!",
              avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNFx6kzWPUb4Uv5ENgQNJvf-iP2WtuCoz8gA&s",
              priority: null
            }
          ]
        },
        {
          id: 3,
          author: "Sarah Johnson",
          text: "Your AI solutions have transformed our workflow! #InnovateAI #Tech",
          avatar: "https://example.com/avatar3.png",
          platform: "Twitter",
          messageType: "mention",
          timestamp: new Date().toLocaleString(),
          likes: 45,
          priority: 'high',
          replies: [
            {
              id: 31,
              author: "Gen AI",
              text: "Urgent attention required. We'll address your feedback immediately.",
              avatar: "https://example.com/ai-avatar.png",
              priority: 'high'
            }
          ]
        },
        {
          id: 4,
          author: "Tech Enthusiast",
          text: "Impressive demo at the AI Summit! 🚀",
          image: "https://example.com/event-photo.jpg",
          avatar: "https://example.com/avatar4.png",
          platform: "Instagram",
          messageType: "comment",
          timestamp: new Date().toLocaleString(),
          likes: 89,
          priority: 'medium',
          replies: [
            {
              id: 41,
              author: "Gen AI",
              text: "I'll review this soon and provide detailed insights about the demo.",
              avatar: "https://example.com/ai-avatar.png",
              priority: 'medium'
            }
          ]
        },
        {
          id: 5,
          author: "Marketing Pro",
          text: "Your latest Twitter campaign is generating amazing engagement! #DigitalMarketing",
          avatar: "https://example.com/avatar5.png",
          platform: "Twitter",
          messageType: "mention",
          timestamp: new Date().toLocaleString(),
          likes: 156,
          priority: 'high',
          replies: [{
            id: 51,
            author: "Gen AI",
            text: "Thank you for noticing! We'll analyze the campaign metrics and share insights soon.",
            avatar: "https://example.com/ai-avatar.png",
            priority: 'medium'
          }]
        },
        {
          id: 6,
          author: "Tech Reviewer",
          text: "Just shared your product demo on my Instagram story! The AI features are mind-blowing 🤖✨",
          avatar: "https://example.com/avatar6.png",
          platform: "Instagram",
          messageType: "mention",
          timestamp: new Date().toLocaleString(),
          likes: 234,
          priority: 'medium',
          replies: [{
            id: 61,
            author: "Gen AI",
            text: "We appreciate the feature! Let's schedule a call to discuss upcoming releases.",
            avatar: "https://example.com/ai-avatar.png",
            priority: 'low'
          }]
        },
        {
          id: 7,
          author: "Tech Reviews Channel",
          text: "Great video on AI implementation! The code walkthrough at 5:23 was especially helpful 👨‍💻",
          avatar: "https://example.com/avatar7.png",
          platform: "YouTube",
          messageType: "comment",
          timestamp: new Date().toLocaleString(),
          likes: 342,
          priority: 'high',
          replies: [{
            id: 71,
            author: "Gen AI",
            text: "Thanks for highlighting that section! We'll be releasing more detailed tutorials soon.",
            avatar: "https://example.com/ai-avatar.png",
            priority: 'medium'
          }]
        },
        {
          id: 8,
          author: "AI Enthusiast",
          text: "The performance benchmarks shown at 12:45 are impressive! What hardware setup are you using? 🤔",
          avatar: "https://example.com/avatar8.png",
          platform: "YouTube",
          messageType: "comment", 
          timestamp: new Date().toLocaleString(),
          likes: 156,
          priority: 'medium',
          replies: [{
            id: 81,
            author: "Gen AI",
            text: "We're using a custom GPU cluster - I'll share the full specs in our next video!",
            avatar: "https://example.com/ai-avatar.png",
            priority: 'low'
          }]
        }
      ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComments, setFilteredComments] = useState(comments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReplyText, setNewReplyText] = useState("");
  const [likedComments, setLikedComments] = useState({});
 
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [quickTemplates, setQuickTemplates] = useState([]);

  const handleLike = (commentId) => {
    setLikedComments(prev => {
      const isCurrentlyLiked = prev[commentId];
      return { ...prev, [commentId]: !isCurrentlyLiked };
    });

    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: (comment.likes || 0) + (likedComments[commentId] ? -1 : 1) 
            }
          : comment
      )
    );
  };
  const handleReply = async (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    
    if (!aiSuggestions[commentId]) {
      const comment = comments.find(c => c.id === commentId);
      const { response, templates } = await generateAIResponse(comment.text);
      setAiSuggestions(prev => ({
        ...prev,
        [commentId]: response
      }));
      setQuickTemplates(templates);
    }
    setNewReplyText("");
  };

  const handleShare = (comment) => {
    if (navigator.share) {
      navigator.share({
        title: `Comment by ${comment.author}`,
        text: comment.text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${comment.author}: ${comment.text}`);
      alert("Comment link copied to clipboard!");
    }
  };

  const submitReply = (commentId) => {
    if (!newReplyText.trim()) return;
  
    const newReply = {
      id: Date.now(),
      author: "Current User",
      text: newReplyText,
      avatar: "https://example.com/default-avatar.png",
      priority: null
    };

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            }
          : comment
      )
    );

    setNewReplyText("");
    setReplyingTo(null);
  };

  const handlePriorityChange = (commentId, replyId = null) => {
    setComments(prevComments => {
      const updatedComments = prevComments.map(comment => {
        if (comment.id === commentId) {
          const priorities = ['high', 'medium', 'low', null];
          const currentIndex = priorities.indexOf(comment.priority);
          const newPriority = priorities[(currentIndex + 1) % priorities.length];
        
          return {
            ...comment,
            priority: newPriority
          };
        }
        if (replyId && comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === replyId) {
              const priorities = ['high', 'medium', 'low', null];
              const currentIndex = priorities.indexOf(reply.priority);
              const nextPriority = priorities[(currentIndex + 1) % priorities.length];
              return { ...reply, priority: nextPriority };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });
      return updatedComments;
    });
  };
  useEffect(() => {
    const filtered = comments.filter(comment => {
      const matchesPlatform = !selectedPlatform || comment.platform === selectedPlatform;
      const matchesSearch = comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comment.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesPlatform && matchesSearch;
    });
    setFilteredComments(filtered);
  }, [searchTerm, comments, selectedPlatform]);

  const renderReplyInput = (commentId) => {
    if (replyingTo === commentId) {
      return (
        <div className={styles.replyInput}>
          <input
            type="text"
            value={newReplyText}
            onChange={(e) => setNewReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={() => submitReply(commentId)}>Send</button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.backgroundCard}>
        <div className={styles.commentSectionCard}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <FaComments className={styles.headerIcon} />
              <span>Comments</span>
            </div>
          </div>

          <div className={styles.commentsContainer}>
            {filteredComments.map((comment) => (
              <div key={comment.id} className={styles.threadCard}>
                <div className={styles.mainComment}>
                  <Avatar src={comment.avatar} alt={comment.author} className={styles.userAvatar} />
                
                  <div className={styles.contentWrapper}>
                    <div className={styles.responseCard}>
                      <div className={styles.headerRow}>
                        <Typography variant="subtitle1" className={styles.authorName}>
                          {comment.author}
                        </Typography>
                        <div className={styles.platformBadge}>
                          {comment.platform === 'LinkedIn' ? <FaLinkedin /> : <FaFacebook />}
                          <span>{comment.platform}</span>
                        </div>
                        <FaFlag 
                          onClick={() => handlePriorityChange(comment.id)}
                          className={styles.priorityFlag}
                          style={{
                            color: comment.priority === 'high' ? '#ff4444' : 
                                 comment.priority === 'medium' ? '#4CAF50' :
                                 comment.priority === 'low' ? '#FFD700' : '#757575'
                          }}
                        />
                      </div>
                      <Typography className={styles.commentText}>{comment.text}</Typography>
                      {comment.platform === 'Facebook' && comment.image && (
                        <div className={styles.imageContainer}>
                          <img 
                            src={comment.image} 
                            alt="Post content" 
                            className={styles.postImage}
                          />
                        </div>
                      )}
                    </div>

                    <div className={styles.actionButtons}>
                      <div className={styles.iconGroup} onClick={() => handleLike(comment.id)}>
                        <ThumbUpAltIcon fontSize="small" />
                        <span>{comment.likes || 0}</span>
                      </div>
                      <div className={styles.iconGroup} onClick={() => handleReply(comment.id)}>
                        <FaReply />
                        <span>Reply</span>
                      </div>
                      <div className={styles.iconGroup} onClick={() => handleShare(comment)}>
                        <FaShare />
                        <span>Share</span>
                      </div>
                    </div>
                  </div>
                </div>

                {renderReplyInput(comment.id)}
                {comment.replies?.map((reply) => (
                <div key={reply.id} className={styles.replySection}>
                  <div className={styles.replyLine}></div> {/* Curved Line */}
                  <Avatar 
                    src={reply.avatar} 
                    alt={reply.author} 
                    className={styles.genAiAvatar} 
                  />
                  <div className={styles.replyCard}>
                    <div className={styles.replyHeader}>
                      <Typography className={styles.authorName}>{reply.author}</Typography>
                      <FaFlag 
                        onClick={() => handlePriorityChange(comment.id, reply.id)}
                        className={styles.priorityFlag}
                        style={{
                          color: reply.priority === 'high' ? '#ff4444' : 
                              reply.priority === 'medium' ? '#4CAF50' :
                              reply.priority === 'low' ? '#FFD700' : '#757575'
                        }}
                   />
          </div>
        <Typography className={styles.replyText}>{reply.text}</Typography>
    </div>
  </div>
))}

                </div>
            ))}
          </div>

          <div className={styles.searchBar}>
            
            <div className={styles.searchInput}>
              <FaSearch />
              <input
                type="text"
                placeholder="The message of the artificail intelligence"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>Run</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;