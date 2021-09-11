import React ,{useState} from 'react'
import signup from '../assets/signup.jpg'
import Cookies from 'universal-cookie'
import axios from 'axios'
const cookies=new Cookies()
const Auth = () => {
    const [isSignup, setisSignup] = useState(true)
    const initialState={
        fullName:'',
        username:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'',
        avatarURL:''
    }
    
    const [form, setform] = useState(initialState)
    const handleChange=(e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const switchMode=()=>{
        if(isSignup){
            setisSignup(false)
        }else{
            setisSignup(true)
        }
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const{fullName,username,password,phoneNumber,avatarURL}=form
        const URL ='http://localhost:5000/auth'
        const {data:{token,userId,hashedPassword}} =await axios.post(`${URL}/${isSignup? 'signup':'login'}`,
        {
            fullName,username,password,phoneNumber,avatarURL
        })
        cookies.set('token',token)
        cookies.set('username',username)
        cookies.set('fullname',fullName)
        cookies.set('userId',userId)
        if (isSignup) {
            cookies.set('phoenNumber',phoneNumber)
            cookies.set('avatarUrl',avatarURL)
            cookies.set('hashedPassword',hashedPassword)
        }
        window.location.reload()
    }
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>
                        {!isSignup ? 'Sign In' : 'Sign Up'}
                    </p>
                    <form onSubmit={handleSubmit} action="">
                        {isSignup &&
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">full Name</label>
                                <input name="fullName" 
                                    placeholder='fullName'
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        }
                         <div className="auth__form-container_fields-content_input">
                                <label htmlFor="Usernameé">Username</label>
                                <input name="username" 
                                    placeholder='username'
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup &&
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input name="phoneNumber" 
                                    placeholder='phoneNumber'
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        }
                        {isSignup &&
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avata Urlr</label>
                                <input name="avatarURL" 
                                    placeholder='avatarURL'
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        }
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input name="password" 
                                    placeholder='password'
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup &&
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input name="confirmPassword" 
                                    placeholder='Confirm password'
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        }
                       <div className='auth__form-container_fields-content_button'>
                       <button type="submit">{isSignup ? 'Sign Up':'Sign In'}</button>
                       
                       </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                           
                            {isSignup ? 'Already have an acount?':'Dont have an account? '}
                        </p>
                        <span onClick={switchMode}>
                        {isSignup ? ' Sign IN':' Sign Up'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signup} alt="sign up" />
            </div>
        </div>
    )
}

export default Auth
