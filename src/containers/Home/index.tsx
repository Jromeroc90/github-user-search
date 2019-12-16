import React, { useState } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@material-ui/core';
import Pagination from "material-ui-flat-pagination";
import Search from '../../components/Search';
import UserCard from '../../components/UserCard';
import axios from '../../util/axios';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Array<any>>([]);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  const onSearch = (page?: number): void => {
    if (query.trim() === '') return;

    const params = {
      q: query,
      page: page ? page : 1,
    };

    setLoading(true);
    setData([]);

    axios.get('/search/users', {
      params,
    }).then((response) => {
      setLoading(false);
      if (response.status === 200) {
        setTotal(response.data.total_count);
        setData(response.data.items);
      }
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    })
  };

  return (
    <div className='home-page'>
      <section className='head'>
        <Container maxWidth='sm'>
          <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
            Github user search
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Enter the word to search then press Enter or hit the button.
          </Typography>
          <Search
            text={query}
            onChange={(text) => setQuery(text)}
            onSearch={() => onSearch()}
          />
        </Container>
      </section>
      <section className='content'>
        <Container>
          {loading ? (
            <div className='container-center'>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={4}>
              {data.map(user => (
                <Grid item key={user.id} xs={12} sm={6} md={4}>
                  <UserCard
                    data={user}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {total > 30 && (
            <div className='container-center'>
              <Pagination
                limit={30}
                offset={page}
                total={total > 1000 ? 1000 : total}
                onClick={(e, offset, page) => {
                  onSearch(page);
                  setPage(offset)
                }}
              />
            </div>
          )}
        </Container>
      </section>
    </div>
  )
};

export default Home;