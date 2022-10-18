import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DELETE_SINGLE_POST } from '../../GraphQL/Mutations/DeleteSinglePost';
import { useMutation } from '@apollo/client';

function ProductCard({ post }: any) {

  const [handleDeletePost, { data, loading, error, reset }] = useMutation(
    DELETE_SINGLE_POST,
    {
      onCompleted: (data) => {
        console.log('on complete-===>', { data });
      },
    }
  );

  const deleteclicked = async (id:number) => {
    const res = await handleDeletePost({
      variables:{
        deleteSinglePostId: id
      }
    })
    console.log(res)
    if(res.data.deleteSinglePost){
      alert('post deleted')
      window.location.reload();
    }
    else{
      alert("unable to delete post")
    }
  }

    const convertDate = (date:any) => {
        return new Date(Number(date)).toDateString()
    }
  return (
    <Card sx={{ minWidth: 275, mb:3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 22 }} color='text.primary' gutterBottom>
          {post.title}
        </Typography>
        <div style={{display:'flex', gap:'15px'}}>
        <Typography color='text.secondary'>
          Price: ${post.price}
        </Typography>
        <Typography color='text.secondary'>
          Rent: ${post.rentPrice} {post.rentType}
        </Typography>
        </div>
        <Typography sx={{ mb: 1 }} color='text.secondary'>
          Category: {post.category}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {post.description}
        </Typography>
        <Typography sx={{ mb: 1 }} color='text.secondary'>
          Date Posted: {convertDate(post.createdAt)}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button onClick={()=> deleteclicked(post.id)} color="error" variant='contained' size='small'>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
