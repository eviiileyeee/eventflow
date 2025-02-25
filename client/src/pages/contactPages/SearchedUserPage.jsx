import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    User, Mail, Calendar, MapPin, Link as LinkIcon, Twitter, Triangle, ArrowLeft
} from 'lucide-react';
import { searchServices } from '../../services/searchServices';
import GitHubStatsCard from '../../components/profileComponents/GithubStatsCard';
const SearchedUserPage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openMenu, setopenMenu] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setIsDarkMode(true);
        }
    }, []);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await searchServices.searchUser(username);
                setUserData(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <div className="text-center text-red-500">
                        <h2 className="text-xl font-semibold mb-2">Error</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" min-h-screen flex flex-col  bg-white dark:bg-gray-800  w-full p-8 transition-all duration-300 animate-fade-in">
            <nav className="sticky top-0 z-50 bg-gradient-to-br from-transparent via-[rgba(145,165,202,0.4)] to-transparent dark:bg-gradient-to-br dark:from-transparent dark:via-[rgba(55,65,81,0.4)] dark:to-transparent shadow-sm backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col md:flex-row m-10">
                <div className="md:w-1/3 text-center mb-8 md:mb-0">
                    <img src={userData.profileImage} alt="Profile" className="rounded-full object-cover w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105" />
                    <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">{userData.username}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{userData.profession}</p>


                </div>
                <div className="md:w-2/3 md:pl-8">
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">About Me</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {userData.discription}
                    </p>
                    <button
                        className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none h-7
            focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
             text-black shadow   px-4 py-2  whitespace-pre md:flex group 
            relative  justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black 
            hover:ring-offset-2 m-5 dark:text-white"
                        onClick={() => setopenMenu(!openMenu)}>
                        Show github stats <Triangle className="h-3 rotate-180" />
                    </button>
                    {openMenu ? <GitHubStatsCard user={userData} /> : ""}
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['JavaScript', 'React', 'Node.js', 'Python', 'SQL'].map((skill, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300">{skill}</span>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Contact Information</h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                            {userData.email || ""}
                        </li>
                        <li className="flex items-center">
                            {userData.phoneNumber || ""}
                        </li>
                        <li className="flex items-center opacity-50 cursor-not-allowed">
                            address
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default SearchedUserPage;