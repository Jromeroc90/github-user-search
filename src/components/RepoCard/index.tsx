import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import StarIcon from '@material-ui/icons/Star';
import CodeIcon from '@material-ui/icons/Code';
import VisibilityIcon from '@material-ui/icons/Visibility';

type RepoCardProps = {
  data: any,
}

const RepoCard: React.FC<RepoCardProps> = ({ data }) => {
  return (
    <Card className='repo-card'>
      <CardContent className='repo-card_content'>
        <a href={data.html_url} target='_blank' rel='noopener noreferrer'>
          <Typography variant='h5' color='primary' gutterBottom>
            {data.name}
          </Typography>
        </a>

        <Typography gutterBottom>
          {data.description}
        </Typography>

        <div className='repo-card_details'>
          {data.language && (
            <div className='repo-card_details-item' title='Language'>
              <LanguageIcon color='primary' />
              {data.language}
            </div>
          )}

          {data.stargazers_count > 0 && (
            <div className='repo-card_details-item' title='Stars'>
              <StarIcon />
              {data.stargazers_count > 1000 ? `${(data.stargazers_count / 1000).toFixed(1)}k` : data.stargazers_count}
            </div>
          )}

          {data.forks_count > 0 && (
            <div className='repo-card_details-item' title='Forks'>
              <CodeIcon />
              {data.forks_count > 1000 ? `${(data.forks_count / 1000).toFixed(1)}k` : data.forks_count}
            </div>
          )}

          {data.watchers_count > 0 && (
            <div className='repo-card_details-item' title='Watchers'>
              <VisibilityIcon />
              {data.watchers_count > 1000 ? `${(data.watchers_count / 1000).toFixed(1)}k` : data.watchers_count}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoCard;