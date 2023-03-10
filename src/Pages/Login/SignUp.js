import React from 'react';
import auth from '../../firebase.init';
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] =
        useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    let signInError;

    if (gUser || user) {
        // console.log(gUser);
    }
    if (gLoading || loading || updating) {
        return (
            <div className="text-center p-20">
                <button className="btn loading text-white">loading...</button>
            </div>
        );
    }
    if (gError || error || updateError) {
        signInError = (
            <p className="text-red-500 p-3">
                {gError?.message || error?.message || updateError?.message}
            </p>
        );
    }

    const onSubmit = async (data) => {
        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('update done');
        navigate('/appointment');
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>

                    {/* -------------------------hook form start---------------------- */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* -------------------------daisy form start---------------------- */}

                        {/* -------------------------name field start---------------------- */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full max-w-xs"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Name is required',
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.name.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        {/* -------------------------name field end---------------------- */}

                        {/* -------------------------email field start---------------------- */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="input input-bordered w-full max-w-xs"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid email',
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        {/* -------------------------email field end---------------------- */}

                        {/* -------------------------password field start---------------------- */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be 6 characters or longer',
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <span className="label-text-alt text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        {/* -------------------------password field end---------------------- */}

                        {/* -------------------------daisy form end---------------------- */}

                        {signInError}

                        <input
                            className="btn w-full max-w-xs text-white"
                            type="submit"
                            value="signup"
                        />
                    </form>
                    {/* -------------------------hook form end---------------------- */}

                    <p>
                        <small>
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary">
                                Please login.
                            </Link>
                        </small>
                    </p>

                    <div className="divider">OR</div>
                    <button
                        className="btn btn-outline"
                        onClick={() => signInWithGoogle()}
                    >
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
