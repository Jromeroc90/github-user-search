import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Container, Grid, Typography, Card, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BusinessIcon from '@material-ui/icons/Business';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import WebIcon from '@material-ui/icons/Web';
import StorageIcon from '@material-ui/icons/Storage';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from '../../util/axios';
import RepoCard from '../../components/RepoCard';

const Profile: React.FC = () => {
  const username = useParams();
  const history = useHistory();
  const [user, setUser] = useState<any>(history.location.state ? history.location.state.user : null);
  const [repos, setRepos] = useState<Array<any> | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const requestUser = axios.get(`/users/${username.id}`);
    const requestRepos = axios.get(`/users/${username.id}/repos`);

    axios.all([requestUser, requestRepos])
      .then(
        axios.spread((...responses) => {
          const userResponse = responses[0];
          const repoResponse = responses[1];
          if (userResponse.status === 200) {
            setUser(userResponse.data);
          }

          if (repoResponse.status === 200) {
            setRepos(repoResponse.data);
          }
      }))
      .catch(errors => {
        setError(true);
        console.error(errors);
      });
  }, []);

  return (
    <div className='profile-page'>
      <Container>
        <Button
          variant='outlined'
          color='primary'
          component={Link}
          className='btn-back'
          to='/'
          startIcon={<ArrowBackIcon />}
        >
          GO BACK
        </Button>
        <Grid container spacing={3}>
          <Grid item sm={12} md={4} lg={3} className='personal-info'>
            {user ? (
              <>
                <img
                  className='personal-info_image'
                  src={user.avatar_url}
                  alt='user_avatar'
                />
                <Typography component='h2' variant='h5' color='textPrimary' gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant='h6' color='textPrimary' gutterBottom>
                  {user.login}
                </Typography>

                {(user && user.company) && (
                  <div className='personal-info_row'>
                    <BusinessIcon />
                    {user.company}
                  </div>
                )}

                {(user && user.location) && (
                  <div className='personal-info_row'>
                    <LocationOnIcon />
                    {user.location}
                  </div>
                )}

                {(user && user.email) && (
                  <div className='personal-info_row'>
                    <MailOutlineIcon />
                    {user.email}
                  </div>
                )}

                {(user && user.blog) && (
                  <a href={user.blog} target='_blank' rel='noopener noreferrer' className='personal-info_row'>
                    <WebIcon />
                    {user.blog}
                  </a>
                )}

                {(user && user.html_url) && (
                  <a href={user.html_url} target='_blank' rel='noopener noreferrer' className='personal-info_row'>
                    <GitHubIcon />
                    {user.html_url}
                  </a>
                )}
              </>
            ) : (
              <>
                <Skeleton variant="rect" width='100%' height={200} />
                <Skeleton />
                <Skeleton width="60%" />
                <Skeleton />
                <Skeleton width="80%" />
              </>
            )}
          </Grid>
          <Grid item sm={12} md={8} lg={9} className='git-info'>
            {(user && user.created_at) && (
              <div className='git-info_row'>
                <QueryBuilderIcon />
                {`Joined GitHub ${moment().diff(user.created_at, 'year')} years ago`}
              </div>
            )}

            {user && (
              <div className='git-info_row'>
                <EmojiPeopleIcon />
                {`Following ${user.following >= 0 ? user.following : 0}`}
              </div>
            )}

            {user && (
              <div className='git-info_row'>
                <PeopleAltIcon />
                {`Followers ${user.followers >= 0 ? user.followers : 0}`}
              </div>
            )}

            {(user && user.public_repos) && (
              <div className='git-info_row'>
                <StorageIcon />
                {`${user.public_repos} public repos`}
              </div>
            )}

            <Typography component='h2' variant='h4' color='textPrimary' gutterBottom>
              Public repos
            </Typography>

            <section className='git-info_repos'>
              {repos ? (repos.map((repo) => (
                <RepoCard
                  key={repo.id}
                  data={repo}
                />
              ))) : (
                <>
                  <Card className='repo-card'>
                    <CardContent>
                      <Skeleton />
                      <Skeleton width="60%" />
                      <Skeleton />
                      <Skeleton width="80%" />
                    </CardContent>
                  </Card>
                  <Card className='repo-card'>
                    <CardContent>
                      <Skeleton />
                      <Skeleton width="60%" />
                      <Skeleton />
                      <Skeleton width="80%" />
                    </CardContent>
                  </Card>
                </>
              )}
            </section>
          </Grid>
        </Grid>

        {error && (
          <div className='message-container'>
            <Typography color='error' className='error-message'>
              Something went wrong. <Link to='/'>Back to Home.</Link>
            </Typography>
          </div>
        )}
      </Container>
    </div>
  )
};

export default Profile;