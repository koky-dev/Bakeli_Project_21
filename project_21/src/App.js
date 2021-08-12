import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomeAdmin from './pages/admin/home'
import Actions from './pages/admin/actions'
import HomeStudent from './pages/student/home'
import Dashboard from './admin-dashbord'
import { AuthProvider } from './contexts/AuthContext'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import CourseAdmin from './pages/admin/course'
import CourseStudent from './pages/student/course'
import Teacher from './pages/admin/teacher'
import Student from './pages/admin/student'
import Courses from './pages/admin/courses'
import Teachers from './pages/admin/teachers'
import Students from './pages/admin/students'
import EditCourse from './pages/admin/EditCourse'
import EditStudent from './pages/admin/EditStudent'
import EditTeacher from './pages/admin/EditTeacher'

import SignUp from './pages/Hooks-Forms/signup'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/admin_home" component={HomeAdmin} />
            <PrivateRoute exact path="/actions" exact component={Actions} />
            <PrivateRoute exact path="/student_home" component={HomeStudent} />
            <PrivateRoute exact path="/course_details" component={CourseAdmin} />
            <PrivateRoute exact path="/student/course_details" component={CourseStudent} />
            <PrivateRoute exact path="/courses" component={Courses} />
            <PrivateRoute exact path="/teachers" component={Teachers}/>
            <PrivateRoute exact path="/students" component={Students}/>
            <PrivateRoute exact path="/edit_course" component={EditCourse}/>
            <PrivateRoute exact path="/edit_student" component={EditStudent}/>
            <PrivateRoute exact path="/edit_teacher" component={EditTeacher}/>
            <PrivateRoute exact path="/teacher_details" component={Teacher}/>
            <PrivateRoute exact path="/student_details" component={Student}/>
            <Route exact path="/hooksforms/signup" component={SignUp} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
