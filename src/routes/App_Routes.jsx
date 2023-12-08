
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LogInPage from '../pages/LogInPage'
import UserListPage from '../pages/UserListPage'
import UserDetailsPage from '../pages/UserDetailsPage'
import StoryDetailsPage from '../pages/StoryDetailsPage'
import CreateStoryPage from '../pages/CreateStoryPage'
import ProtectedRoutes from './ProtectedRoutes'
import MyStoriesPage from '../pages/MyStoriesPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import RankingPage from '../pages/RankingPage'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={'/microsRanking'} element={<RankingPage />} />
            <Route path={"/signUp"} element={<SignUpPage />} />
            <Route path={"/logIn"} element={<LogInPage />} />
            <Route path={"/usuarios"} element={<UserListPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path={"/usuarios/detalles/:userId"} element={<UserDetailsPage />} />
                <Route path={"/microrrelatos/detalles/:storyId"} element={<StoryDetailsPage />} />
                <Route path={"/crearMicrorrelato"} element={<CreateStoryPage />} />
                <Route path={"/miPerfil"} element={<UserDetailsPage />} />
                <Route path={"/misMicrorrelatos/:userId"} element={<MyStoriesPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />

        </Routes >

    )
}
export default AppRoutes