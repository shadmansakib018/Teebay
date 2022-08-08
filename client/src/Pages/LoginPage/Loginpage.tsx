import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../GraphQL/Mutations/LoginMutation';
import LinearLoad from '../../Components/LoadingUI/LinearLoad';
import Snackbar from '../../Components/Snackbar/Snackbar';
import { useState } from 'react';

function Loginpage() {
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
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const [handleLogin, { data, loading, error, reset  }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {  console.log("on complete-===>",{data});  }
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (dataform: IFormInputs) => {
    console.log(dataform)
    const res = await handleLogin({
      variables: {
        username: dataform.username,
        password: dataform.password,
      },
    });

    if (error || res.data.login.errors) {
      setText(res.data.login.errors[0].message);
      setAlertType('error');
      handleClick();

      reset()
    }else if(res.data.login.user){
      setText("successfully logged in");
      setAlertType('success');
      handleClick();
      localStorage.setItem('username', res.data.login.user.username)
      localStorage.setItem('id', res.data.login.user.id)
      localStorage.setItem('firstname', res.data.login.user.firstName)
      localStorage.setItem('lastname', res.data.login.user.lastName)
      setTimeout(()=>{
        navigate("/", { replace: true });
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
          sx={{ fontSize: 24, textAlign: 'center', fontWeight: 600 }}
          gutterBottom
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Username'
            variant='outlined'
            fullWidth
            sx={{ mb: errors?.username ? 1 : 4, mt: 6 }}
            {...register('username', { required: true })}
          />
          {errors.username?.type === 'required' && (
            <Typography sx={{ color: 'red', mb: 4 }}>
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
            <Typography sx={{ color: 'red', mb: 4 }}>
              Password is required
            </Typography>
          )}
          {loading ? (
            <LinearLoad />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardActions>
                <Button type='submit' variant='contained' size='large'>
                  Login
                </Button>
              </CardActions>

              <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ padding: '8px 11px', fontSize: 16 }}>
                  don't have an account?
                </Typography>
                <Button
                  onClick={() => navigate('/register', { replace: false })}
                  variant='text'
                  size='large'
                >
                  Sign Up
                </Button>
              </CardActions>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
    <Snackbar text={text} alertType={alertType} open={open} handleClose={handleClose} />
    </div>
  );
}

export default Loginpage;
