import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { addProject } from './addProject';
import { getProjects } from './getProjects';
import { getUser } from "./getUser";
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './AuthContext';
import { Navigate } from 'react-router-dom';

function Home() {
  const [newProject, setNewProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState('')

  const navigate = useNavigate();
  //const { CheckUserLogginIn } = useContext(AuthContext);

  useEffect(() => {

    const user = getUser();
    if(!user) {
      navigate('/login');
    } else {
        setUser(user.username);
        const storedProjects = getProjects();
        setProjects(storedProjects);
    }

  }, [])

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if(projectTitle === '') {
      toast.error('Venlist skriv projekt navn');
      return;
    }

    const { username } =JSON.parse(localStorage.getItem('this_user'));
    
    const {projects, message, error} = await addProject(projectTitle, username);
    
    if(error) {
      toast.error(error);
    } else {
      setProjects(projects);
      setProjectTitle('');
      toast.success(message);
    }
    setNewProject(false);
  }
  
  return (
    <div className="App">
      <div className="container">
        <ToastContainer />
        <h1>{user}s prosjekter</h1>
        {!newProject ? (
            <div className="new_project">
              <h3>Tilføy nytt prosjekt</h3>
              <button className="add_project" onClick={() => setNewProject(true)}>
                <BsFillPlusCircleFill size={40} style={{color: "#1e5c058a"}} />
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='projectTitle'>Prosjekt navn</label>
              <input autoComplete="off" type="text" id="projectTitle" name="projectTitle" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
              <button type="submit">Tilføy prosjekt</button>
            </form>
          )}
        <div className="all_projects">
          <h2>{projects?.length === 0 ? 'Du har ingen prosjekter endda' : "Mine prosjekter"}</h2>
          {projects.map((project, key) => {
            return(
              <div key={key} className="project">
                <h3>{project}</h3>
              </div>
            )
          })}
          
          
        </div>
        <a href={'/hours'}>Registrer timer</a>
      </div>
    </div>
  );
}

export default Home;