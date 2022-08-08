import { useQuery} from '@apollo/client';
import { useEffect} from 'react';
import { CheckLoggedIn } from '../../Helpers/HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { POST_QUERY } from '../../GraphQL/Queries/PostQueries';
import CircularLoad from '../../Components/LoadingUI/CircularLoad';
import Button from '@mui/material/Button';
import ProductCard from '../../Components/ProductCard/ProductCard';

function Mainpage({client}:any) {
  let navigate = useNavigate();

  const { loading, error, data , refetch} = useQuery(POST_QUERY, {
    variables: {
      username: localStorage.getItem('username')
    },
    onCompleted : (data) => {console.log(data)}
  });
  
  useEffect(() => {
    if (CheckLoggedIn()) {
      refetch();
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div
      style={{
        backgroundColor: '#e0e0e05c',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '85px',
          backgroundColor: '#144a79cc',
          boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.40)',
        }}
      >
        <div
          style={{
            width: '85%',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ color: 'white', fontSize: 48, fontWeight: 100 }}>
            TEEBAY
          </Typography>
          <Typography
            onClick={logoutHandler}
            sx={{
              backgroundColor: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              fontFamily: 'roboto',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Logout
          </Typography>
        </div>
      </div>
      <div
        style={{
          width: '85%',
          backgroundColor: '#E7EBF0',
          margin: '0 auto',
          minHeight: '100vh',
          marginTop: '40px',
          borderRadius: '8px',
          padding: '25px 30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginBottom:'35px'
          }}
        >
          <Typography variant="h6">Your Products</Typography>
          <Button
            onClick={() => navigate('/addProduct', { replace: false })}
            variant='contained'
            size='small'
          >
            Add Product
          </Button>
        </div>
        {loading ? (
          <div
            style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
          >
            <CircularLoad />
          </div>
        ) : (
          data.PostOfOneUser.postsWritten.map(((post: any, idx:number) => <ProductCard key={''+idx} post={post}/>)
        ))}
      </div>
    </div>
  );
}

export default Mainpage;
