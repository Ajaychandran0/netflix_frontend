// src/pages/Home.tsx
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';

// Dummy movie data
const dummyMovies = [
    { id: 1, title: 'Inception', image: 'https://www.themoviedb.org/t/p/w1280/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg' },
    { id: 2, title: 'Interstellar', image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg' },
    { id: 3, title: 'The Dark Knight', image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { id: 4, title: 'The Matrix', image: 'https://www.themoviedb.org/t/p/w1280/53McB8R9RUBxfINRxWaPwUMtL5Q.jpg' },
   
  ];
  

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#141414', width: '100vw', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: 500,
          backgroundImage: `url('https://image.tmdb.org/t/p/original/6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          p: 4,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#fff' }}>
            Featured Movie
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 600, color: '#fff' }}>
            Explore our collection of exciting movies and shows — all tailored just for you.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Watch Now
          </Button>
        </Box>
      </Box>

      {/* Movie Row */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>
          Trending Now
        </Typography>
        <Grid container spacing={2}>
          {dummyMovies.map((movie) => (
            <Grid size={{ xs: 12,sm:6, md: 4 }} key={movie.id}>
              <Card sx={{ backgroundColor: '#1e1e1e' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.image}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
