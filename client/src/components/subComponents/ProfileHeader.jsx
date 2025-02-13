import React from "react";
import {
    Github,
} from "lucide-react"

export default function ProfileHeader(props){
    return (
    <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow">
      <img
        src={ props.user.profileImage || "https://tse3.mm.bing.net/th?id=OIP.JttmcrrQ9_XqrY60bFEfgQHaHa&pid=Api&P=0&h=180"}
        alt=" User Avtar"
        className="h-20 w-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold dark:text-white">{props.user.username}</h2>
        <p className="text-gray-600 dark:text-gray-400">{props.user.email.slice(0,14)}...</p>
        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400"
         onClick={() => window.open(props.user.githubUrl, '_blank')}>
          <Github className="h-4 w-4 mr-1" />
          <span>Github</span>
        </div>
      </div>
    </div>
  );
}
