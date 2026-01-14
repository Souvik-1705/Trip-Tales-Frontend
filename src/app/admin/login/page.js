"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/admin-login.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLogin(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const router=useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");

        try {
            const res=await fetch(`${BASE_URL}/api/admin/login`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            });
            const data=await res.json();
            if(!res.ok){
                setError(data.message || "Invalid Credentials");
                return;
            }
            localStorage.setItem("adminToken",data.token);
            router.push("/admin/dashboard");
        } catch (error) {
            setError("Something went wrong");
        }
    }
    return(
        <div className="admin-login-container">
            <h1 style={{marginBottom:"20px"}}>Admin Login</h1>

            <form onSubmit={handleSubmit} className="admin-login-form">
                <input type="email"placeholder="Email"value={email}onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password"placeholder="Password"value={password}onChange={(e)=>setPassword(e.target.value)}required/>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
} 