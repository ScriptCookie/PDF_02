import {Routes , Route} from 'react-router-dom';
import ManagerLogin from './Components/ManagetLogin';
import ManagerSignUp from './Components/ManagerSignUp';
import Managermainpage from './Components/Managermainpage';
import Createsubject from './Components/Createsubject';
import Assignment from './Components/Assignment';
import Createassi from './Components/Createassi';

function App() {
    

  return(
    <div id='App'>
      <Routes>
        <Route path='*' element={<ManagerLogin/>}></Route>
        <Route path='/managersignup' element={<ManagerSignUp/>}></Route>
        <Route path='/manager' element={<Managermainpage/>}></Route>
        <Route path='/createsubject' element={<Createsubject/>}></Route>
        <Route path='/assignment' element={<Assignment/>}></Route>
        <Route path='/createassi' element={<Createassi/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
