import {Routes , Route} from 'react-router-dom';
import ManagerLogin from './Components/ManagetLogin';
import ManagerSignUp from './Components/ManagerSignUp';
import Managermainpage from './Components/Managermainpage';
import Createsubject from './Components/Createsubject';

function App() {
    

  return(
    <div id='App'>
      <Routes>
        <Route path='*' element={<ManagerLogin/>}></Route>
        <Route path='/managersignup' element={<ManagerSignUp/>}></Route>
        <Route path='/manager' element={<Managermainpage/>}></Route>
        <Route path='/createsubject' element={<Createsubject/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
