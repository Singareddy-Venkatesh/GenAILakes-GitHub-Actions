import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './draganddrop.module.css';

const testPosts = [
  {
    id: '1',
    title: 'Morning Post',
    time: '09:00 AM',
    content: 'Morning content update'
  },
  {
    id: '2',
    title: 'Afternoon Post',
    time: '02:00 PM',
    content: 'Afternoon content update'
  },
  {
    id: '3',
    title: 'Evening Post',
    time: '06:00 PM',
    content: 'Evening content update'
  }
];

const DragandDrop = ({ posts = testPosts, setPosts, onConflict }) => {
  const [items, setItems] = useState(posts);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
    if (setPosts) setPosts(reorderedItems);
  };

  return (
    <Card className={styles.dragDropCard}>
      <CardContent>
        <Typography variant="h8" gutterBottom>
          Scheduled posts
        </Typography>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="posts">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.postsList}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.postCard}
                      >
                        <CardContent>
                          <Typography variant="subtitle1">{item.title}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {item.time}
                          </Typography>
                          <Typography variant="body2">{item.content}</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default DragandDrop;
