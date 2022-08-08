import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADDPRODUCT_MUTATION } from '../../GraphQL/Mutations/AddProductMutation';
import LinearLoad from '../../Components/LoadingUI/LinearLoad';
import Snackbar from '../../Components/Snackbar/Snackbar';
import MenuItem from '@mui/material/MenuItem';

function AddProductPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let navigate = useNavigate();

  const CATEGORIES = [
    'ELECTRONICS',
    'FURNITURE',
    'HOME APPLIANCES',
    'SPORTING GOODS',
    'OUTDOOR',
    'TOYS',
  ];

  interface IFormInputs {
    rentType: string;
    description: string;
    title: string;
    category: string;
    rentPrice: number;
    price: number;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const [handleAddProduct, { data, loading, error, reset }] = useMutation(
    ADDPRODUCT_MUTATION,
    {
      onCompleted: (data) => {
        console.log('on complete-===>', { data });
      },
    }
  );

  const onSubmit: SubmitHandler<IFormInputs> = async (
    dataform: IFormInputs
  ) => {
    console.log(dataform);
    const res : any = await handleAddProduct({
      variables: {
        username: localStorage.getItem('username'),
        title: dataform.title,
        description: dataform.description,
        category: dataform.category,
        price: Number(dataform.price),
        rentPrice: Number(dataform.rentPrice),
        rentType: dataform.rentType,
      }
    });

    if (error || res.data.AddPost.errors) {
        console.log("error")
        setText(res.data.AddPost.errors[0].message);
        setAlertType('error');
        handleClick();
  
        reset()
      }else if(res.data.AddPost){
          console.log("suuccess")
        setText("Product Added Successfully");
        setAlertType('success');
        handleClick();
        
        setTimeout(()=>{
          navigate("/", { replace: true });
        }, 600)
        
      }
  };

  return (
    <div style={{ backgroundColor: '#E7EBF0', padding: '20px' }}>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: '85%',
          margin: '0 auto',
          pl: 3,
          pr: 3,
          pb: 3,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 24, textAlign: 'center', fontWeight: 600 }}
            gutterBottom
          >
            Add Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              sx={{ mb: errors?.title ? 1 : 4, mt: 6 }}
              {...register('title', { required: true })}
            />
            {errors.title?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                title is required
              </Typography>
            )}

            <TextField
              select
              defaultValue={''}
              fullWidth
              sx={{ mb: errors?.category ? 1 : 4 }}
              label='Category'
              {...register('category', { required: true })}
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {errors.category?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                category is required
              </Typography>
            )}
            <TextField
              label='Price ($)'
              variant='outlined'
              type='number'
              sx={{ mb: errors?.price ? 1 : 4 }}
              {...register('price', { required: true })}
            />
            {errors.price?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                price is required
              </Typography>
            )}

            <TextField
              select
              fullWidth
              defaultValue={''}
              sx={{ mb: errors?.rentType ? 1 : 4 }}
              label='Rental Period'
              {...register('rentType', { required: true })}
            >
              {['Daily', 'Monthly', 'Hourly'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            {errors.rentType?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                Rental Period price is required
              </Typography>
            )}

            <TextField
              label='Rent Price ($)'
              variant='outlined'
              type='number'
              sx={{ mb: errors?.rentPrice ? 1 : 4 }}
              {...register('rentPrice', { required: true })}
            />
            {errors.rentPrice?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                Rent price is required
              </Typography>
            )}

            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              multiline
              rows={5}
              type='text'
              sx={{ mb: errors?.description ? 1 : 4 }}
              {...register('description', { required: true })}
            />
            {errors.description?.type === 'required' && (
              <Typography sx={{ color: 'red', mb: 3 }}>
                Description is required
              </Typography>
            )}

            {loading ? (
              <LinearLoad />
            ) : (
              <CardActions>
                <Button
                  sx={{ ml: 'auto' }}
                  type='submit'
                  variant='contained'
                  size='large'
                >
                  Add Product
                </Button>
              </CardActions>
            )}
          </form>
        </CardContent>
      </Card>
      <Snackbar
        text={text}
        alertType={alertType}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}

export default AddProductPage;
