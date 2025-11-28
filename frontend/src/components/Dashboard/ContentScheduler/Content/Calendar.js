import React, { useState } from 'react';
import { Calendar, Badge, Card } from 'antd';
import moment from 'moment';
import styles from './Calendar.module.css';

const ContentCalendar = () => {
  const [view, setView] = useState('month');
  const [filters, setFilters] = useState({
    platform: 'all',
    postType: 'all',
    status: 'all',
  });

  const scheduledContent = [
    {
      id: 1,
      title: 'Facebook Campaign Post',
      platform: 'facebook',
      type: 'text',
      status: 'pending',
      date: '2024-01-15',
      campaign: 'Winter Sale',
    },
    {
      id: 2,
      title: 'Instagram Reel',
      platform: 'instagram',
      type: 'reel',
      status: 'approved',
      date: '2024-01-15',
      campaign: 'Product Launch',
    },
  ];

  const platformColors = {
    facebook: '#1877F2',
    instagram: '#E4405F',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
  };

  const getPostTypeBadge = (type) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'video':
        return '🎥';
      case 'reel':
        return '📱';
      default:
        return '📄';
    }
  };

  const dateCellRender = (date) => {
    const dayContent = scheduledContent.filter(
      (content) =>
        moment(content.date).isSame(date, 'day') &&
        (filters.platform === 'all' || content.platform === filters.platform) &&
        (filters.postType === 'all' || content.type === filters.postType) &&
        (filters.status === 'all' || content.status === filters.status)
    );

    return (
      <div className={styles['content-list']}>
        {dayContent.map((content) => (
          <div
            key={content.id}
            className={styles['content-item']}
            style={{
              borderLeft: `3px solid ${platformColors[content.platform]}`,
            }}
          >
            <Badge
              status={content.status === 'approved' ? 'success' : 'processing'}
              text={`${getPostTypeBadge(content.type)} ${content.title}`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={styles['scheduler-container']}>
      <div className={styles['filter-section']}>
        <select
          onChange={(e) =>
            setFilters({ ...filters, platform: e.target.value })
          }
        >
          <option value="all">All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, postType: e.target.value })
          }
        >
          <option value="all">All Types</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
          <option value="reel">Reel</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
        </select>

        <div className={styles['view-toggle']}>
          <button onClick={() => setView('month')}>Month</button>
          <button onClick={() => setView('year')}>Year</button>
        </div>
      </div>

      <Calendar
        dateCellRender={dateCellRender}
        mode={view}
        onPanelChange={(date, mode) => setView(mode)}
        style={{ maxWidth: '100%' }}
      />
    </Card>
  );
};

export default ContentCalendar;
