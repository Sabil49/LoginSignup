import React from "react";
import axios from 'axios';

import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";

const url = "http://localhost:3000/api";

export default function App(props) {
  const [selected, setSelected] = React.useState("sign-up");
  const [users,setUsers] = React.useState(props.tasks);
  const [signupdata, setSignupdata] = React.useState({});
  const [logindata, setLogindata] = React.useState({});

  const handleChange = (e) => {
    const name=e.target.name;
    const value=e.target.value;
    setSignupdata((values) => ({...values, [name]: value}));
  }
  const loginChange = (e) => {
    const name=e.target.name;
    const value=e.target.value;
    setLogindata((values) => ({...values, [name]: value}));
  }
  

  const handleSignup = async(e) => {     
    e.preventDefault();   
    try{
    console.log(signupdata);
    if(signupdata.password!=signupdata.confirmPassword){
     console.log("Please match password");
    }
    else{
        const {data} = await axios.post(url, signupdata);
        console.log(data.message);
    }
   }
    catch(error){
     console.log(error)
    }
 };


 const handleLogin = async(e) => {     
  e.preventDefault();   
  try{
    console.log(users);
   // console.log(logindata.loginEmail);
    const userIndex = users.filter((user) => user.email === logindata.loginEmail);
  console.log(userIndex[0]);
  if(userIndex!=""){      
      console.log("user is found");
  }
  else{
    console.log("user is not found");
  }
 }
  catch(error){
   console.log(error)
  }
};

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[515px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input isRequired label="Email" name="loginEmail" value={logindata.loginEmail || ""}
                  onChange={loginChange} placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password" name="loginPassword" value={logindata.loginPassword || ""}
                  onChange={loginChange}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form onSubmit={handleSignup} className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" name="name" onChange={handleChange} value={signupdata.name || ""} placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" name="email" onChange={handleChange} value={signupdata.email || ""} placeholder="Enter your email" type="email" />
                <Input isRequired label="Contact" name="contact" onChange={handleChange} value={signupdata.contact || ""} placeholder="Enter your contact" type="text" />
                <Input
                  isRequired
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={signupdata.password || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  name="confirmPassword"
                  value={signupdata.confirmPassword || ""}
                  onChange={handleChange}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}


export const getServerSideProps = async() => {
  const {data} = await axios.get(url);
  return {
    props: {
      tasks: data.data
    },
  }
}