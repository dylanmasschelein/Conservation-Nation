import "./Signup.scss";
import axios from "axios";
import { useForm } from "react-hook-form";

const Signup = ({ setToggleModal, setModalText, history }) => {
  const successAlert = () => {
    alert("Signup Successful!");
    history.push("/user/login");
  };

  const failedAlert = () => {
    setToggleModal(true);
    setModalText("Passwords must match!");
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`http://localhost:8080/user/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        country: data.country,
        volunteer: data.volunteer,
        about: data.about,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      .then((res) => {
        console.log(res);
        res.data.status === "ok" ? successAlert() : failedAlert();
      })
      .catch((err) => console.error(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <div className='signup'>
      <h2 className='signup__name'>Register here!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='signup__form'>
        <div className='signup__left'>
          <label htmlFor='firstName' className='signup__label'>
            First name
            <input
              {...register("firstName", { required: true })}
              id='firstName'
              className='signup__input'
            />
            {errors.firstName && <p>First name is required</p>}
          </label>
          <label htmlFor='lastName' className='signup__label'>
            Last Name
            <input
              {...register("lastName", { required: true })}
              className='signup__input'
            />
            {errors.lastName && <p>Last name is required</p>}
          </label>
          <label htmlFor='address' className='signup__label'>
            Address
            <input
              {...register("address", { required: true })}
              id='address'
              className='signup__input'
            />
            {errors.address && <p>address is required</p>}
          </label>
          <label htmlFor='city' className='signup__label'>
            City
            <input
              {...register("city", { required: true })}
              id='city'
              className='signup__input'
            />
            {errors.city && <p>city is required</p>}
          </label>
          <label htmlFor='country' className='signup__label'>
            Country
            <input
              {...register("country", { required: true })}
              id='country'
              className='signup__input'
            />
            {errors.country && <p>country is required</p>}
          </label>

          <label htmlFor='about' className='signup__label'>
            About you...
            <input
              {...register("about", { required: true })}
              id='about'
              className='signup__input signup__input--about'
            />
            {errors.about && <p>about you is required</p>}
          </label>
        </div>
        <div className='signup__right'>
          <label
            htmlFor='volunteer'
            className='signup__label signup__label--radio'
          >
            Avaliable to volunteer?
          </label>
          <div className='signup__radio'>
            <label>
              <input
                type='radio'
                value={true}
                {...register("volunteer", { required: true })}
                id='volunteer'
              />
              Yes
            </label>
            <label>
              <input
                type='radio'
                value={false}
                {...register("volunteer", { required: true })}
                id='volunteer'
              />
              No
              {errors.volunteer && <p>Volunteer availabilty is required</p>}
            </label>
          </div>

          <label htmlFor='email' className='signup__label'>
            Email
            <input
              type='email'
              {...register("email", { required: true })}
              id='email'
              className='signup__input'
            />
            {errors.email && <p>Email is required</p>}
          </label>
          <label htmlFor='password' className='signup__label'>
            Password
            <input
              type='password'
              {...register("password", { required: true })}
              id='password'
              className='signup__input'
            />
            {errors.password && <p>Password is required</p>}
          </label>
          <label htmlFor='password' className='signup__label'>
            Confirm Password
            <input
              type='password'
              {...register("confirmPassword", { required: true })}
              id='confirmPassword'
              className='signup__input'
            />
            {errors.confirmPassword && <p>Password confirmation is required</p>}
          </label>

          <button type='submit' className='signup__submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
