import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

type UserCardProps = {
  data: any,
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  return (
    <Link
      to={{
        pathname: `/${data.login}`,
        state: { user: data }
      }}
    >
      <Card className='card'>
        <div className='card_image'>
          <img
            src={data.avatar_url}
            alt='user_avatar'
            title='User avatar'
          />
        </div>
        <CardContent>
          <Typography gutterBottom>
            {data.login}
          </Typography>
          <Typography>
            {`Score: ${data.score}`}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
};

export default UserCard;