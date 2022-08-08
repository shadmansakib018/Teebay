import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../GraphQL/Mutations/RegisterMutation';
import LinearLoad from '../../Components/LoadingUI/LinearLoad';
import Snackbar from '../../Components/Snackbar/Snackbar';
import { useState } from 'react';

function Regsiterpage() {
  let navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [alertType, setAlertType] = useState<'success'|'error'>()

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  interface IFormInputs {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const [handleRegister, { data, loading, error, reset }] =
    useMutation(REGISTER_MUTATION, {
      onCompleted: (data) => {  console.log("on complete-===>",{data});  }
    });

  const onSubmit: SubmitHandler<IFormInputs> = async (
    dataform: IFormInputs
  ) => {
    const res = await handleRegister({
      variables: {
        username: dataform.username,
        password: dataform.password,
        firstname: dataform.firstname,
        lastname: dataform.lastname,
      },
    });

    if (error || res.data.AddUser.errors) {
      setText(res.data.AddUser.errors[0].message);
      setAlertType('error');
      handleClick();
      reset();
    }else if(res.data.AddUser.user){
      setText("successfully created an account!");
      setAlertType('success');
      handleClick();
      setTimeout(()=>{
        navigate("/login", { replace: true });
      }, 500)
      
    }
  };

  return (
    <div>
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 500,
        margin: '0 auto',
        mt: '10%',
        border: '1px solid #adadad',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 24, textAlign: 'center', fontWeight: 600, mb: 6 }}
          gutterBottom
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}
          >
            <TextField
              label='Firstname'
              variant='outlined'
              sx={{ mb: errors?.firstname ? 1 : 4 }}
              {...register('firstname', { required: true })}
            />
            {errors.firstname?.type === 'required' && (
              <Typography sx={{ color: 'red' }}>*</Typography>
            )}
            <TextField
              label='Lastname'
              variant='outlined'
              sx={{ mb: errors?.lastname ? 1 : 4 }}
              {...register('lastname', { required: true })}
            />
            {errors.lastname?.type === 'required' && (
              <Typography sx={{ color: 'red' }}>*</Typography>
            )}
          </div>
          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            sx={{ mb: errors?.username ? 1 : 4 }}
            {...register('username', { required: true })}
          />
          {errors.username?.type === 'required' && (
            <Typography sx={{ color: 'red', mb: 3 }}>
              Username is required
            </Typography>
          )}
          <TextField
            label='Password'
            variant='outlined'
            fullWidth
            type='password'
            sx={{ mb: errors?.password ? 1 : 4 }}
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && (
            <Typography sx={{ color: 'red', mb: 3 }}>
              Password is required
            </Typography>
          )}
          {loading ? (
            <LinearLoad />
          ) : (
            <CardActions>
              <Button
                sx={{ m: '0 auto', width: '100%' }}
                type='submit'
                variant='contained'
                size='large'
              >
                Register
              </Button>
            </CardActions>
          )}
        </form>
      </CardContent>
    </Card>
    <Snackbar text={text} alertType={alertType} open={open} handleClose={handleClose} />
    </div>
  );
}

export default Regsiterpage;
